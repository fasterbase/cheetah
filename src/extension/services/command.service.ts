import { CommandDto } from '@cheetah/dtos/extension';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandRepository } from '../repositories/command.repository';

@Injectable()
export class ExtensionService {
  constructor(private readonly commandRepository: CommandRepository) {}

  async addCommand(commandDto: CommandDto): Promise<CommandDto> {
    try {
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
}
