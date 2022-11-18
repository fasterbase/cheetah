import { CommandDto } from '@cheetah/dtos/extension';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, CommandDocument } from '../schemas/order.schema';

@Injectable()
export class CommandRepository {
  constructor(
    @InjectModel(Command.name) private commandModel: Model<CommandDocument>,
  ) {}

  async insertOne(commandDto: CommandDto) {
    return await this.commandModel.create(commandDto);
  }

  async findOne(options: {
    companyId: string;
    filter: Partial<CommandDto>;
  }): Promise<Command> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const command = await this.commandModel.findOne(filter);

    if (command) return command.toObject();
    return null;
  }

  async findMany(options: {
    companyId: string;
    filter?: Partial<CommandDto>;
  }): Promise<Command[]> {
    let { filter } = options;
    const { companyId } = options;
    if (!filter) filter = { companyId };
    filter.companyId = companyId;

    const command = await this.commandModel.find(filter);

    if (command) return command.map((device) => device.toObject());
    throw new NotFoundException('Command not found');
  }

  async removeTestData() {
    await this.commandModel.deleteOne({ name: '_test' });
  }
}