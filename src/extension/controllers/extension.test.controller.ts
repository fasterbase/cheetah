import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandRepository } from '../repositories/command.repository';

@ApiTags('Extension Test')
@Controller('extension/test/')
export class ExtensionTestController {
  constructor(private readonly commandRepository: CommandRepository) {}

  @Delete()
  async removeTestData() {
    await this.commandRepository.removeTestData();
    return { status: true };
  }
}
