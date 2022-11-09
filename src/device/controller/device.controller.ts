import { DeviceService } from '../services/device.service';
import { HttpExceptionFilter } from '@cheetah/error-handler/http-exception.filter';
import { DeviceDto } from '@cheetah/dtos/devices';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  addNewDevice(@Body() deviceDto: DeviceDto): DeviceDto {
    const data = this.deviceService.addNewDevice(deviceDto);
    return DeviceDto.validate(data);
  }
}
