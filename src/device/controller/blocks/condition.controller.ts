import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { ConidtionService } from './../../services/blocks/condition.service';
import { CustomSegmentDto, SegmentDto } from '@cheetah/dtos/devices';
import { PaginationDto } from '@cheetah/dtos';

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
  @ApiResponse({ type: PaginationDto<SegmentDto> })
  async getSegments(): Promise<PaginationDto<SegmentDto>> {
    this.logger.log('getSegments called');
    const data = await this.conidtionService.getSegmentList();
    return {
      data,
      more: false,
    };
  }
  @Post('custom-segments')
  @ApiResponse({ type: CustomSegmentDto })
  async createCustomSegment(
    @Body() customSegmentDto: CustomSegmentDto,
  ): Promise<CustomSegmentDto> {
    this.logger.log('createCustomSegment called');
    customSegmentDto.companyId = 'STATIC_CID';
    const data = await this.conidtionService.createCustomSegmentList(
      customSegmentDto,
    );
    return CustomSegmentDto.validate(data);
  }

  @Get('custom-segments')
  @ApiResponse({ type: PaginationDto<CustomSegmentDto> })
  async getCustomSegmentList(): Promise<PaginationDto<CustomSegmentDto>> {
    this.logger.log('getCustomSegments called');
    const data = await this.conidtionService.getCustomSegmentList('STATIC_CID');
    return {
      data: CustomSegmentDto.arrayValidate(data),
      more: false,
    };
  }

  @Get('operations')
  @ApiResponse({ type: PaginationDto<SegmentDto> })
  async getOperations(): Promise<PaginationDto<SegmentDto>> {
    this.logger.log('getSegments called');
    const data = await this.conidtionService.getSegmentList();
    return {
      data,
      more: false,
    };
  }
}
