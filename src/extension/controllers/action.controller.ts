import { PaginationDto } from '@cheetah/dtos';
import { ActionSourceDto, ActionTypeDto } from '@cheetah/dtos/extension';
import { Controller, Get } from '@nestjs/common';
import { ActionExtensionService } from '../services/action.service';

@Controller('extension/action')
export class ActionExtensionController {
  constructor(
    private readonly actionExtensionService: ActionExtensionService,
  ) {}

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
