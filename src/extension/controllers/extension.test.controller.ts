import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActionRepository } from '../repositories/action.repository';
import { CommandRepository } from '../repositories/command.repository';

@ApiTags('Extension Test')
@Controller('extension/test/')
export class ExtensionTestController {
  constructor(
    private readonly commandRepository: CommandRepository,
    private readonly actionRepository: ActionRepository,
  ) {}

  @Delete()
  async removeTestData() {
    await this.commandRepository.removeTestData();
    await this.actionRepository.removeTestData();
    return { status: true };
  }
}
