import { MetaWorkSpaceDto, WorkSpaceDto } from '@cheetah/dtos/storage';
import { Body, Controller, Post } from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';

@Controller('storage/workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async addNewWorkspace(
    @Body() workSpaceDto: WorkSpaceDto,
  ): Promise<MetaWorkSpaceDto> {
    return await this.workspaceService.addNewWorkspace(workSpaceDto);
  }
}
