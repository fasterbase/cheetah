import { ActionDto } from '@cheetah/dtos/extension';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from '../schemas/action.schema';

@Injectable()
export class ActionRepository {
  constructor(
    @InjectModel(Action.name) private actiondModel: Model<ActionDocument>,
  ) {}

  async insertOne(actionDto: ActionDto): Promise<Action> {
    const data = await this.actiondModel.create(actionDto);
    return data.toObject();
  }

  async removeTestData() {
    await this.actiondModel.deleteOne({ name: '_test' });
  }
}
