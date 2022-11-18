import { PaginationDto } from '@cheetah/dtos';
import {
  ActionListDto,
  ActionSourceDto,
  CommandDto,
} from '@cheetah/dtos/extension';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExtensionService } from '../services/extension.service';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}
  @Post('command')
  async addCommand(@Body() commandDto: CommandDto): Promise<CommandDto> {
    commandDto.companyId = 'STATIC_CID';
    return await this.extensionService.addCommand(commandDto);
  }

  @Get('command')
  async getCommandsList(
    @Query() commandDto: CommandDto,
  ): Promise<PaginationDto<CommandDto>> {
    commandDto.companyId = 'STATIC_CID';
    const data = await this.extensionService.getCommandsList(commandDto);
    return {
      data,
      more: false,
    };
  }

  @Get('action-list')
  getAvailableActionStates(): PaginationDto<ActionListDto> {
    const data = this.extensionService.getAvailableActionStates();
    return {
      data,
      more: false,
    };
  }

  @Get('action-source')
  getAvailableActionSource(): PaginationDto<ActionSourceDto> {
    const data = this.extensionService.getAvailableActionSource();
    return {
      data,
      more: false,
    };
  }
}
