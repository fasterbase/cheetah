import { ActionDto } from '@cheetah/dtos/extension';
import { ActionsDto } from '@cheetah/dtos/extension/actions.dto';
import { UpdateActionDto } from '@cheetah/dtos/extension/update-action.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from '../schemas/action.schema';

@Injectable()
export class ActionRepository {
  constructor(
    @InjectModel(Action.name) private actiondModel: Model<ActionDocument>,
  ) {}

  async insertOne(actionDto: ActionDto): Promise<ActionDto> {
    const data = await this.actiondModel.create(actionDto);
    return data.toObject();
  }

  async pushNewAction(options: {
    id: string;
    actionsDto: ActionsDto;
  }): Promise<boolean> {
    const { id, actionsDto } = options;

    const isPriorityExist = await this.actiondModel.exists({
      _id: id,
      actions: {
        $elemMatch: { priority: actionsDto.priority },
      },
    });
    if (isPriorityExist)
      throw new HttpException('Priority Exist', HttpStatus.BAD_REQUEST);
    await this.actiondModel.updateOne(
      { _id: id },
      { $push: { actions: actionsDto } },
    );
    return true;
  }

  async updateAction(options: {
    companyId: ActionDto['companyId'];
    actionId: string;
    updateAction: UpdateActionDto;
  }) {
    const { companyId, actionId, updateAction } = options;
    await this.actiondModel.updateOne(
      { _id: actionId, companyId },
      {
        $set: {
          updateAction,
        },
      },
    );
  }

  async updateActions(options: {
    companyId: ActionDto['companyId'];
    actionId: string;
    actionsList: ActionsDto[];
  }) {
    const { companyId, actionId, actionsList } = options;
    await this.actiondModel.updateOne(
      { _id: actionId, companyId },
      {
        $set: {
          actions: actionsList,
        },
      },
    );
  }

  async findActions(options: {
    companyId: ActionDto['companyId'];
    status?: boolean;
  }): Promise<ActionDto[]> {
    const { companyId, status = true } = options;
    const data = await this.actiondModel.find({ companyId, status });
    return data.map((d) => d.toObject());
  }

  async findAction(options: { id: string }): Promise<ActionDto> {
    const { id } = options;
    const data = await this.actiondModel.findOne({ _id: id });
    return data.toObject();
  }

  async removeTestData() {
    await this.actiondModel.deleteOne({ name: '_test' });
  }
}
