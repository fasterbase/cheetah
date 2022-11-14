import { DeviceService } from '../services/device.service';
import { DeviceByIdDto, DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { ActionAccepted, Pagination } from '@cheetah/dtos';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';

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

  @Get('list')
  async getAllDevices(): Promise<Pagination<DeviceDto>> {
    this.logger.log('getAllDevices called');
    const data = await this.deviceService.getDevices({
      companyId: 'STATIC_CID',
    });
    return {
      data: DeviceDto.arrayValidate(data),
      more: false,
    };
  }

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

  @Post('/output')
  async addOrUpdateOutput(
    @Body() outputDto: OutputDto,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('addNewOutput called', { outputDto });
    this.deviceService.addOrUpdateOutput(outputDto);
    return ActionAccepted;
  }
}
