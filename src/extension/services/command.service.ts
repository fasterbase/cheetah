import { CommandDto } from '@cheetah/dtos/extension';
import { UpdateCommandDto } from '@cheetah/dtos/extension/update-command.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandRepository } from '../repositories/command.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommandService {
  constructor(private readonly commandRepository: CommandRepository) {}

  async addCommand(commandDto: CommandDto): Promise<CommandDto> {
    try {
      commandDto.commandId = uuidv4();
      return (await this.commandRepository.insertOne(commandDto)).toObject();
    } catch (e) {
      throw new HttpException('duplicate command name', HttpStatus.BAD_REQUEST);
    }
  }

  async getCommandsList(commandDto: Partial<CommandDto>) {
    return await this.commandRepository.findMany({
      companyId: commandDto.companyId,
    });
  }

  async updateCommand(
    commandId: string,
    updateCommandDto: UpdateCommandDto,
  ): Promise<boolean> {
    const companyId = updateCommandDto.companyId;
    if (!companyId && !commandId)
      throw new HttpException(
        'command can not be authorized',
        HttpStatus.BAD_REQUEST,
      );
    delete updateCommandDto.companyId;
    delete updateCommandDto.commandId;

    return await this.commandRepository.updateOne({
      commandId,
      updateCommandDto,
    });
  }
}
