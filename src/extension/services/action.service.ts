import {
  ActionSource,
  ActionSourceMapper,
  ActionType,
  ActionTypeMapper,
} from '@cheetah/constants/extension';
import { ActionSourceDto, ActionTypeDto } from '@cheetah/dtos/extension';
import { Injectable } from '@nestjs/common';
import { CommandRepository } from '../repositories/command.repository';

@Injectable()
export class ActionExtensionService {
  constructor(private readonly commandRepository: CommandRepository) {}

  getActionType(): ActionTypeDto[] {
    return Object.keys(ActionTypeMapper).map((key) => {
      const action = key as unknown as ActionType;
      return {
        name: ActionTypeMapper[key],
        value: action,
      };
    });
  }

  getAvailableActionSource(): ActionSourceDto[] {
    return Object.keys(ActionSourceMapper).map((key) => {
      const actionSource = key as unknown as ActionSource;
      return {
        name: ActionSourceMapper[key],
        value: actionSource,
      };
    });
  }
}
