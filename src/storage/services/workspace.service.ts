import { MetaWorkSpaceDto, WorkSpaceDto } from '@cheetah/dtos/storage';
import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../repositories/workspace.repository';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async addNewWorkspace(workSpaceDto: WorkSpaceDto): Promise<MetaWorkSpaceDto> {
    const companyId = 'STATIC_CID';
    try {
      await this.workspaceRepository.initialWorkspace({
        companyId,
      });
    } catch (e) {
      console.error(e);
    }

    return await this.workspaceRepository.insertWorkspace({
      companyId,
      workSpaceDto,
    });
  }
}
