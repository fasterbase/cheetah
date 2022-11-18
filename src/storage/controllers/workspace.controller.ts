import { PaginationDto } from '@cheetah/dtos';
import {
  ColumnDto,
  MetaWorkSpaceDto,
  OperationDto,
  QueryDto,
  WorkSpaceDto,
} from '@cheetah/dtos/storage';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  async getWorkSpace(): Promise<MetaWorkSpaceDto> {
    return await this.workspaceService.getWorkSpace();
  }

  @Post('/:workspaceName')
  async addNewColumn(
    @Body() columnDto: ColumnDto,
    @Param('workspaceName') workspaceName: string,
  ): Promise<MetaWorkSpaceDto> {
    return await this.workspaceService.addNewColumn({
      columnName: columnDto.name,
      workspaceName,
    });
  }

  @Get('operations-list')
  getOperationsList(): PaginationDto<OperationDto> {
    const data = this.workspaceService.getOperationsList();
    return {
      data,
      more: false,
    };
  }

  @Get('queries-list')
  getQueriesList(): PaginationDto<QueryDto> {
    const data = this.workspaceService.getQueriesList();
    return {
      data,
      more: false,
    };
  }
}
