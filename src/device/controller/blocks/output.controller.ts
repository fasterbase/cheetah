import { OutputDto } from '@cheetah/dtos/devices';
import { ActionAccepted } from '@cheetah/dtos';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { OutputService } from 'src/device/services/blocks/output.service';

@ApiTags('Device Blocks Output')
@Controller('device/block/output')
export class DeviceOutPutController {
  constructor(
    private readonly logger: LoggerService,
    private readonly outputService: OutputService,
  ) {
    this.logger.setContext(DeviceOutPutController.name);
  }

  @Put()
  async addOrUpdateOutput(
    @Body() outputDto: OutputDto,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('addNewOutput called', { outputDto });
    const result = await this.outputService.addOrUpdateOutput(outputDto);
    if (result) return ActionAccepted;
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }

  @Put('update-active-status')
  async removeOutput(
    @Body() outputDto: OutputDto,
  ): Promise<typeof ActionAccepted> {
    this.logger.log('removeOutput called', { outputDto });
    const result = await this.outputService.updateActiveStatus(outputDto);
    if (result) return ActionAccepted;
    throw new HttpException('Device or output not found', HttpStatus.NOT_FOUND);
  }
}
