import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { PaginationDto } from '@cheetah/dtos';
import { ActionSourceDto, ActionTypeDto } from '@cheetah/dtos/extension';
import { ActionDto } from '@cheetah/dtos/extension/action.dto';
import { ActionsDto } from '@cheetah/dtos/extension/actions.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActionExtensionService } from '../services/action.service';

@ApiTags('Actions')
@Controller('extension/action')
export class ActionExtensionController {
  constructor(
    private readonly actionExtensionService: ActionExtensionService,
  ) {}

  @ApiResponse({ type: ActionDto })
  @Post()
  async newAction(@Body() actionDto: ActionDto): Promise<ActionDto> {
    actionDto.companyId = 'STATIC_CID';
    return await this.actionExtensionService.newAction(actionDto);
  }

  @Put('/:id')
  @ApiResponse({ type: ActionDto })
  async pushNewAction(
    @Body() actionsDto: ActionsDto,
    @Param('id') id: string,
  ): Promise<ActionDto> {
    return await this.actionExtensionService.pushNewAction({ id, actionsDto });
  }

  @ApiExtraModels(ActionDto)
  @ApiPaginationResponse(ActionDto, 'getActionsList')
  @Get()
  async getActionsList(): Promise<PaginationDto<ActionDto>> {
    const companyId = 'STATIC_CID';
    const data = await this.actionExtensionService.getActionsList(companyId);
    return {
      data,
      more: false,
    };
  }
  @ApiExtraModels(ActionTypeDto)
  @ApiPaginationResponse(ActionTypeDto, 'getActionType')
  @Get('type')
  getActionType(): PaginationDto<ActionTypeDto> {
    const data = this.actionExtensionService.getActionType();
    return {
      data,
      more: false,
    };
  }

  @ApiResponse({ type: ActionSourceDto })
  @Get('source')
  getAvailableActionSource(): PaginationDto<ActionSourceDto> {
    const data = this.actionExtensionService.getAvailableActionSource();
    return {
      data,
      more: false,
    };
  }
}
