import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { ConidtionService } from './../../services/blocks/condition.service';
import { SegmentDto } from '@cheetah/dtos/devices';
import { Pagination } from '@cheetah/dtos';

@ApiTags('Device Blocks Condition')
@Controller('device/block/condition')
export class DeviceConditionController {
  constructor(
    private readonly logger: LoggerService,
    private readonly conidtionService: ConidtionService,
  ) {
    this.logger.setContext(DeviceConditionController.name);
  }

  @Get('segments')
  @ApiResponse({ type: [SegmentDto] })
  async getSegments(): Promise<Pagination<SegmentDto>> {
    this.logger.log('getSegments called');
    const data = await this.conidtionService.getSegmentList();
    return {
      data: SegmentDto.arrayValidate(data),
      more: false,
    };
    throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
  }
}
