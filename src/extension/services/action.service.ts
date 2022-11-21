import {
  ActionSource,
  ActionSourceMapper,
  ActionType,
  ActionTypeMapper,
} from '@cheetah/constants/extension';
import {
  ActionDto,
  ActionSourceDto,
  ActionTypeDto,
} from '@cheetah/dtos/extension';
import { Injectable } from '@nestjs/common';
import { ActionRepository } from '../repositories/action.repository';

@Injectable()
export class ActionExtensionService {
  constructor(private readonly actionRepository: ActionRepository) {}

  async newAction(actionDto: ActionDto): Promise<ActionDto> {
    return await this.actionRepository.insertOne(actionDto);
  }

  async getActionsList(companyId: string): Promise<ActionDto[]> {
    return await this.actionRepository.findActions({
      companyId,
    });
  }

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