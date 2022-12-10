import { ConditionDto } from '@cheetah/dtos/extension/condition.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condition, ConditionDocument } from '../schemas/condition.schema';

@Injectable()
export class ConditionRepository {
  constructor(
    @InjectModel(Condition.name)
    private conditionModel: Model<ConditionDocument>,
  ) {}

  async insertOne(conditionDto: ConditionDto) {
    return await this.conditionModel.create(conditionDto);
  }

  async findOne(options: {
    companyId: string;
    filter: Partial<ConditionDto>;
  }): Promise<ConditionDto> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const condition = await this.conditionModel.findOne(filter);

    if (condition) {
      const cmd = condition.toObject();
      cmd['id'] = cmd._id;
      return cmd;
    }
    return null;
  }

  async findMany(options: {
    companyId: string;
    filter?: Partial<ConditionDto>;
  }): Promise<ConditionDto[]> {
    let { filter } = options;
    const { companyId } = options;
    if (!filter) filter = { companyId };
    filter.companyId = companyId;

    const command = await this.conditionModel.find(filter);

    if (command)
      return command.map((com) => {
        const c = com.toObject();
        c['id'] = c._id;
        return c;
      });
    throw new NotFoundException('Command not found');
  }

  async removeTestData() {
    await this.conditionModel.deleteOne({ name: '_test' });
  }
}
