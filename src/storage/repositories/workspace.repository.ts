import { MetaWorkSpaceDto, WorkSpaceDto } from '@cheetah/dtos/storage';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const workspace = await this.findWorkspace(companyId);
      this.validateNewWorkspace(workspace, workSpaceDto.name);

      await this.workspaceModel.updateOne(
        { companyId },
        { $push: { workspaces: { name: workSpaceDto.name } } },
      );

      workspace.workspaces.push({ name: workSpaceDto.name });

      return workspace;
    } catch (e) {
      return e;
    }
  }

  async findWorkspace(companyId: string): Promise<MetaWorkSpaceDto> {
    const workspace = await this.workspaceModel.findOne({ companyId });
    if (workspace) return workspace.toObject();
    return null;
  }

  async validateNewWorkspace(
    metaWorkSpaceDto: MetaWorkSpaceDto,
    workspaceName: string,
  ) {
    if (metaWorkSpaceDto.workspaceLimit <= metaWorkSpaceDto.workspaces.length)
      throw new HttpException(
        'workspaces limit reached',
        HttpStatus.PAYMENT_REQUIRED,
      );
    const isNameDuplicate = !metaWorkSpaceDto.workspaces.every(
      (ws) => ws.name !== workspaceName,
    );
    if (isNameDuplicate)
      throw new HttpException('duplicate name', HttpStatus.BAD_REQUEST);
  }

  async removeTestData() {
    await this.workspaceModel.deleteOne({ companyId: 'STATIC_CID' });
  }
}
