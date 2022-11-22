import { OutputDto } from '@cheetah/dtos/devices';
import { ActionAccepted } from '@cheetah/dtos';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { OutputService } from './../../services/blocks/output.service';

@ApiTags('Device Blocks Output')
@Controller('device/block/output')
export class DeviceOutPutController {
  constructor(
    private readonly logger: LoggerService,
    private readonly outputService: OutputService,
  ) {
    this.logger.setContext(DeviceOutPutController.name);
  }

  @Put('/:deviceId')
  async addOrUpdateOutput(
    @Body() outputDto: OutputDto,
    @Param('deviceId') deviceId: string,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('addNewOutput called', { outputDto });
    const result = await this.outputService.addOrUpdateOutput({
      outputDto,
      deviceId,
    });
    if (result) return ActionAccepted;
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }

  @Put('update-active-status/:deviceId')
  async removeOutput(
    @Body() outputDto: OutputDto,
    @Param('deviceId') deviceId: string,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('removeOutput called', { outputDto });
    const result = await this.outputService.updateActiveStatus({
      outputDto,
      deviceId,
    });
    if (result) return ActionAccepted;
    throw new HttpException('Device or output not found', HttpStatus.NOT_FOUND);
  }
}
