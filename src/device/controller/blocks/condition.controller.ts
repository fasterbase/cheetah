import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { ConidtionService } from './../../services/blocks/condition.service';
import {
  CompareDto,
  CustomSegmentDto,
  OperationDto,
  SegmentDto,
} from '@cheetah/dtos/devices';
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
    console.log('bye', SegmentDto, CustomSegmentDto);
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
    return await this.conidtionService.createCustomSegmentList(
      customSegmentDto,
    );
  }

  @Get('custom-segments')
  @ApiResponse({ type: PaginationDto<CustomSegmentDto> })
  async getCustomSegmentList(): Promise<PaginationDto<CustomSegmentDto>> {
    this.logger.log('getCustomSegments called');
    const data = await this.conidtionService.getCustomSegmentList('STATIC_CID');
    return {
      data,
      more: false,
    };
  }

  @Get('operations')
  @ApiResponse({ type: PaginationDto<OperationDto> })
  async getOperations(): Promise<PaginationDto<OperationDto>> {
    this.logger.log('getOperations called');
    const data = await this.conidtionService.getOperationsList();
    return {
      data,
      more: false,
    };
  }

  @Get('compares')
  @ApiResponse({ type: PaginationDto<CompareDto> })
  async getCompares(): Promise<PaginationDto<CompareDto>> {
    this.logger.log('getCompares called');
    const data = await this.conidtionService.getComparesList();
    return {
      data,
      more: false,
    };
  }
}
