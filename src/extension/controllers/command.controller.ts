import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { PaginationDto } from '@cheetah/dtos';
import { CommandDto } from '@cheetah/dtos/extension';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExtensionService } from '../services/command.service';

@ApiTags('Commands')
@Controller('extension/command')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post()
  @ApiResponse({ type: CommandDto })
  async addCommand(@Body() commandDto: CommandDto): Promise<CommandDto> {
    commandDto.companyId = 'STATIC_CID';
    return await this.extensionService.addCommand(commandDto);
  }

  @Get()
  @ApiExtraModels(CommandDto)
  @ApiPaginationResponse(CommandDto, 'getCommandsList')
  async getCommandsList(
    @Query() commandDto?: Partial<CommandDto>,
  ): Promise<PaginationDto<CommandDto>> {
    commandDto.companyId = 'STATIC_CID';
    const data = await this.extensionService.getCommandsList(commandDto);
    return {
      data,
      more: false,
    };
  }
}
