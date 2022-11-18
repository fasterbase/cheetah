import { MetaWorkSpaceDto, WorkSpaceDto } from '@cheetah/dtos/storage';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.workspaceModel.updateOne(
      { companyId },
      { $push: { workspaces: workSpaceDto } },
    );
    return await this.findWorkspace(companyId);
  }

  async findWorkspace(companyId: string): Promise<MetaWorkSpaceDto> {
    const workspace = await this.workspaceModel.findOne({ companyId });
    if (workspace) return workspace.toObject();
    return null;
  }

  async removeTestData() {
    await this.workspaceModel.deleteOne({ companyId: 'STATIC_CID' });
  }
}
