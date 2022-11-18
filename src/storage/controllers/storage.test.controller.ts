import { Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspaceRepository } from '../repositories/workspace.repository';

@ApiTags('Extension Test')
@Controller('storage/test/')
export class StorageTestController {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  @Delete()
  async removeTestData() {
    await this.workspaceRepository.removeTestData();
    return { status: true };
  }
}
