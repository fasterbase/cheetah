import { MetaWorkSpaceDto, WorkSpaceDto } from '@cheetah/dtos/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async initialWorkspace(
    metaWorkSpaceDto: MetaWorkSpaceDto,
  ): Promise<MetaWorkSpaceDto> {
    return (
      await this.workspaceModel.create({
        companyId: metaWorkSpaceDto.companyId,
        workspaces: [],
        workspaceLimit: 2,
      })
    ).toObject();
  }

  async insertWorkspace(options: {
    companyId: string;
    workSpaceDto: WorkSpaceDto;
  }): Promise<MetaWorkSpaceDto> {
    const { companyId, workSpaceDto } = options;
    const workspace = await this.findWorkspace(companyId);
    this.validateNewWorkspace(workspace, workSpaceDto.name);

    const dataToInsert: WorkSpaceDto = {
      name: workSpaceDto.name,
      columns: [],
      columnLimit: 5,
    };
    await this.workspaceModel.updateOne(
      { companyId },
      { $push: { workspaces: dataToInsert } },
    );

    workspace.workspaces.push(dataToInsert);

    return workspace;
  }

  async findWorkspace(companyId: string): Promise<MetaWorkSpaceDto> {
    const workspace = await this.workspaceModel.findOne({ companyId });
    if (workspace) return workspace.toObject();
    return null;
  }

  async addColumnToWorkspace(options: {
    companyId: string;
    workspaceName: WorkSpaceDto['name'];
    columnName: string;
  }) {
    const { companyId, workspaceName, columnName } = options;

    const metaWorkspace = await this.findWorkspace(companyId);
    const workspace = metaWorkspace.workspaces.find(
      (workspace) => workspace.name === workspaceName,
    );
    if (!workspace)
      throw new HttpException('workspace not found', HttpStatus.NOT_FOUND);
    this.validateColumnName(workspace, columnName);
    await this.workspaceModel.updateOne(
      { companyId, 'workspaces.name': workspaceName },
      { $push: { 'workspaces.$.columns': columnName } },
    );
  }

  validateNewWorkspace(
    metaWorkSpaceDto: MetaWorkSpaceDto,
    workspaceName: string,
  ) {
    if (metaWorkSpaceDto.workspaceLimit <= metaWorkSpaceDto.workspaces.length)
      throw new HttpException(
        'workspaces limit reached',
        HttpStatus.PAYMENT_REQUIRED,
      );

    if (metaWorkSpaceDto.workspaces.length == 0) return true;
    const isNameDuplicate = !metaWorkSpaceDto.workspaces.every(
      (ws) => ws.name !== workspaceName,
    );
    if (isNameDuplicate)
      throw new HttpException(
        'duplicate workspace name',
        HttpStatus.BAD_REQUEST,
      );
  }

  validateColumnName(workSpaceDto: WorkSpaceDto, columnName: string) {
    if (workSpaceDto.columnLimit <= workSpaceDto.columns.length)
      throw new HttpException(
        'columns limit reached',
        HttpStatus.PAYMENT_REQUIRED,
      );

    if (workSpaceDto.columns.length == 0) return true;
    const isNameDuplicate = workSpaceDto.columns.includes(columnName);
    if (isNameDuplicate)
      throw new HttpException(
        'duplicate workspace name',
        HttpStatus.BAD_REQUEST,
      );
  }

  async removeTestData() {
    await this.workspaceModel.deleteOne({ companyId: 'STATIC_CID' });
  }
}
