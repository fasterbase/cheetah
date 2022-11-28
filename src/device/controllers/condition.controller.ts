import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { LoggerService } from '@cheetah/logger';
import { ConidtionService } from '../services/condition.service';
import {
  CompareDto,
  CustomSegmentDto,
  OperationDto,
  SegmentDto,
} from '@cheetah/dtos/devices';
import { PaginationDto } from '@cheetah/dtos';
import { ApiPaginationResponse } from '@cheetah/common/decorators';

@ApiTags('Blocks')
@Controller('device/block/condition')
export class DeviceConditionController {
  constructor(
    private readonly logger: LoggerService,
    private readonly conidtionService: ConidtionService,
  ) {
    this.logger.setContext(DeviceConditionController.name);
  }

  @Get('segments')
  @ApiExtraModels(SegmentDto)
  @ApiPaginationResponse(SegmentDto, 'getSegments')
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
    return await this.conidtionService.createCustomSegmentList(
      customSegmentDto,
    );
  }

  @Get('custom-segments')
  @ApiPaginationResponse(CustomSegmentDto, 'getCustomSegmentList')
  async getCustomSegmentList(): Promise<PaginationDto<CustomSegmentDto>> {
    this.logger.log('getCustomSegments called');
    const data = await this.conidtionService.getCustomSegmentList('STATIC_CID');
    return {
      data,
      more: false,
    };
  }

  @Get('operations')
  @ApiExtraModels(OperationDto)
  @ApiPaginationResponse(OperationDto, 'getOperations')
  async getOperations(): Promise<PaginationDto<OperationDto>> {
    this.logger.log('getOperations called');
    const data = await this.conidtionService.getOperationsList();
    return {
      data,
      more: false,
    };
  }

  @Get('compares')
  @ApiExtraModels(CompareDto)
  @ApiPaginationResponse(CompareDto, 'getCompares')
  async getCompares(): Promise<PaginationDto<CompareDto>> {
    this.logger.log('getCompares called');
    const data = await this.conidtionService.getComparesList();
    return {
      data,
      more: false,
    };
  }
}
