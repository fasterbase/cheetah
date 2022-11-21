import { PaginationDto } from '@cheetah/dtos';
import { ActionSourceDto, ActionTypeDto } from '@cheetah/dtos/extension';
import { ActionDto } from '@cheetah/dtos/extension/action.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActionExtensionService } from '../services/action.service';

@Controller('extension/action')
export class ActionExtensionController {
  constructor(
    private readonly actionExtensionService: ActionExtensionService,
  ) {}

  @Post()
  async newAction(@Body() actionDto: ActionDto): Promise<any> {
    return await this.actionExtensionService.newAction(actionDto);
  }

  @Get('type')
  getActionType(): PaginationDto<ActionTypeDto> {
    const data = this.actionExtensionService.getActionType();
    return {
      data,
      more: false,
    };
  }

  @Get('source')
  getAvailableActionSource(): PaginationDto<ActionSourceDto> {
    const data = this.actionExtensionService.getAvailableActionSource();
    return {
      data,
      more: false,
    };
  }
}
