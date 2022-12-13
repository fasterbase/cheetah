import { CommandDto } from '@cheetah/dtos/extension';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Command, CommandDocument } from '../schemas/command.schema';

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

    if (command) {
      const cmd = command.toObject();
      cmd['id'] = cmd._id;
      return cmd;
    }
    return null;
  }

  async updateOne(options: {
    commandDto: Partial<CommandDto>;
    commandId: string;
    companyId: string;
  }): Promise<boolean> {
    const { commandDto: deviceDto, companyId, commandId } = options;
    await this.commandModel.updateOne({ companyId, _id: commandId }, deviceDto);
    return true;
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

    if (command)
      return command.map((com) => {
        const c = com.toObject();
        c['id'] = c._id;
        return c;
      });
    throw new NotFoundException('Command not found');
  }

  async removeTestData() {
    await this.commandModel.deleteOne({ name: '_test' });
  }
}
