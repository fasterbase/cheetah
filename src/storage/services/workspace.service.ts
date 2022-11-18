import { Operation, OperationMapper } from '@cheetah/constants/storage';
import {
  MetaWorkSpaceDto,
  OperationDto,
  WorkSpaceDto,
} from '@cheetah/dtos/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getWorkSpace(): Promise<MetaWorkSpaceDto> {
    const companyId = 'STATIC_CID';
    const workspace = await this.workspaceRepository.findWorkspace(companyId);
    if (workspace) return workspace;
    throw new HttpException('workspace is not exist', HttpStatus.NOT_FOUND);
  }

  getOperationsList(): OperationDto[] {
    return Object.keys(OperationMapper).map((key) => {
      const operation = key as unknown as Operation;
      return {
        name: OperationMapper[key],
        value: operation,
      };
    });
  }

  async addNewColumn(options: {
    workspaceName: WorkSpaceDto['name'];
    columnName;
  }): Promise<MetaWorkSpaceDto> {
    const companyId = 'STATIC_CID';
    const { workspaceName, columnName } = options;
    await this.workspaceRepository.addColumnToWorkspace({
      companyId,
      workspaceName,
      columnName,
    });
    return this.workspaceRepository.findWorkspace(companyId);
  }
}
