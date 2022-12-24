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
import { ActionsDto } from '@cheetah/dtos/extension/actions.dto';
import { Injectable } from '@nestjs/common';
import { ActionRepository } from '../repositories/action.repository';

@Injectable()
export class ActionExtensionService {
  constructor(private readonly actionRepository: ActionRepository) {}

  async newAction(actionDto: ActionDto): Promise<ActionDto> {
    return await this.actionRepository.insertOne(actionDto);
  }

  async pushNewAction(options: {
    id: string;
    actionsDto: ActionsDto;
  }): Promise<ActionDto> {
    const { id, actionsDto } = options;
    await this.actionRepository.pushNewAction({
      id,
      actionsDto,
    });
    return await this.getAction(id);
  }

  async getAction(id: string): Promise<ActionDto> {
    return await this.actionRepository.findAction({ id });
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

  updateActions(options: {
    id: string;
    companyId: string;
    actionsList: ActionsDto[];
  }) {
    const { actionsList, id, companyId } = options;
    this.actionRepository.updateActions({
      companyId,
      actionId: id,
      actionsList,
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
