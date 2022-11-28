import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConditionRepository } from '../repositories/condition.repository';
import { DeviceRepository } from '../repositories/device.repository';

@ApiTags('Device')
@Controller('device/test/')
export class DeviceTestController {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly conditionRepository: ConditionRepository,
  ) {}

  @Delete()
  async removeTestData() {
    await this.deviceRepository.removeTestData();
    await this.conditionRepository.removeTestData();
    return { status: true };
  }
}
