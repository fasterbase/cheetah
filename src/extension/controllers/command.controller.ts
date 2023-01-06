import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { ActionAccepted, PaginationDto } from '@cheetah/dtos';
import { CommandDto } from '@cheetah/dtos/extension';
import { UpdateCommandDto } from '@cheetah/dtos/extension/update-command.dto';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandService } from '../services/command.service';

@ApiTags('Commands')
@Controller('extension/command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  @ApiResponse({ type: CommandDto })
  async addCommand(@Body() commandDto: CommandDto): Promise<CommandDto> {
    commandDto.companyId = 'STATIC_CID';
    return await this.commandService.addCommand(commandDto);
  }

  @Get()
  @ApiExtraModels(CommandDto)
  @ApiPaginationResponse(CommandDto, 'getCommandsList')
  async getCommandsList(
    @Query() commandDto?: Partial<CommandDto>,
  ): Promise<PaginationDto<CommandDto>> {
    commandDto.companyId = 'STATIC_CID';
    const data = await this.commandService.getCommandsList(commandDto);
    return {
      data,
      more: false,
    };
  }

  @ApiResponse({ type: Boolean })
  @Put('/:_id')
  async updateCommand(
    @Body() updateCommandDto: UpdateCommandDto,
    @Param('_id') commandId: string,
  ): Promise<typeof ActionAccepted> {
    await this.commandService.updateCommand(commandId, updateCommandDto);
    return ActionAccepted;
  }
}
