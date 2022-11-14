import { Body, Controller, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeviceRepository } from '../repositories/device.repository';

@ApiTags('Device')
@Controller('device/test/')
export class DeviceTestController {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  @Delete()
  async removeTestData() {
    await this.deviceRepository.removeTestData();
    return { status: true };
  }
}
