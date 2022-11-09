import { DeviceService } from '../services/device.service';
import { HttpExceptionFilter } from '@cheetah/error-handler/http-exception.filter';
import { DeviceDto } from '@cheetah/dtos/devices';
import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'libs/logger/src';

@UseFilters(HttpExceptionFilter)
@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(
    private readonly logger: LoggerService,
    private readonly deviceService: DeviceService,
  ) {
    this.logger.setContext(DeviceController.name);
  }

  @Post()
  async addNewDevice(@Body() deviceDto: DeviceDto): Promise<DeviceDto> {
    this.logger.log('addNewDevice called', { deviceDto });
    const data = await this.deviceService.addNewDevice(deviceDto);
    return DeviceDto.validate(data);
  }

  @Get()
  async getAllDevices(): Promise<DeviceDto[]> {
    this.logger.log('getAllDevices called');
    const data = await this.deviceService.getDevices({
      companyId: 'STATIC_CID',
    });
    return DeviceDto.arrayValidate(data);
  }
}
