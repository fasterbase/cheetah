import { DeviceService } from '../services/device.service';
import { DeviceByIdDto, DeviceDto } from '@cheetah/dtos/devices';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { PaginationDto } from '@cheetah/dtos';
import { ApiPaginationResponse } from '@cheetah/common/decorators';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(
    private readonly logger: LoggerService,
    private readonly deviceService: DeviceService,
  ) {
    this.logger.setContext(DeviceController.name);
  }

  @ApiResponse({ type: DeviceDto })
  @Post()
  async addNewDevice(@Body() deviceDto: DeviceDto): Promise<DeviceDto> {
    this.logger.log('addNewDevice called', { deviceDto });
    const data = await this.deviceService.addNewDevice(deviceDto);
    return DeviceDto.validate(data);
  }

  @ApiPaginationResponse(DeviceDto, 'getAllDevices')
  @Get('list')
  async getAllDevices(): Promise<PaginationDto<DeviceDto>> {
    this.logger.log('getAllDevices called');
    const data = await this.deviceService.getDevices({
      companyId: 'STATIC_CID',
    });
    return {
      data: DeviceDto.arrayValidate(data),
      more: false,
    };
  }

  @ApiResponse({ type: DeviceDto })
  @Get('/:_id')
  async getDeviceById(
    @Param() deviceByIdDto: DeviceByIdDto,
  ): Promise<DeviceDto> {
    this.logger.log('getDeviceById called');
    const data = await this.deviceService.getDevice({
      companyId: 'STATIC_CID',
      deviceId: deviceByIdDto._id,
    });
    if (data) return DeviceDto.validate(data);
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }
}
