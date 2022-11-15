import { DeviceService } from './../../services/device.service';
import { OutputDto } from '@cheetah/dtos/devices';
import { ActionAccepted } from '@cheetah/dtos';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';

@ApiTags('Device/Block/Output')
@Controller('device/block/output')
export class DeviceBlockOutPutController {
  constructor(
    private readonly logger: LoggerService,
    private readonly deviceService: DeviceService,
  ) {
    this.logger.setContext(DeviceBlockOutPutController.name);
  }

  @Put()
  async addOrUpdateOutput(
    @Body() outputDto: OutputDto,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('addNewOutput called', { outputDto });
    const result = await this.deviceService.addOrUpdateOutput(outputDto);
    if (result) return ActionAccepted;
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }

  @Put('update-active-status')
  async removeOutput(
    @Body() outputDto: OutputDto,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('removeOutput called', { outputDto });
    const result = await this.deviceService.updateActiveStatus(outputDto);
    if (result) return ActionAccepted;
    throw new HttpException('Device or output not found', HttpStatus.NOT_FOUND);
  }
}
