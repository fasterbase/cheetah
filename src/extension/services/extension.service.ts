import { ActionList, ActionListMapper } from '@cheetah/constants';
import { ActionListDto, CommandDto } from '@cheetah/dtos/extension';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandRepository } from '../repositories/command.repository';

@Injectable()
export class ExtensionService {
  constructor(private readonly commandRepository: CommandRepository) {}

  async addCommand(commandDto: CommandDto) {
    try {
      return await this.commandRepository.insertOne(commandDto);
    } catch (e) {
      throw new HttpException('Duplicate name', HttpStatus.BAD_REQUEST);
    }
  }

  async getCommandsList(commandDto: CommandDto) {
    return await this.commandRepository.findMany({
      companyId: commandDto.companyId,
      filter: commandDto,
    });
  }
  getAvailableActionStates(): ActionListDto[] {
    return Object.keys(ActionListMapper).map((key) => {
      const action = key as unknown as ActionList;
      return {
        name: ActionListMapper[key],
        value: action,
      };
    });
  }
}
