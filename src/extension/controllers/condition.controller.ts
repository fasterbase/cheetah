import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { PaginationDto } from '@cheetah/dtos';
import { ConditionDto } from '@cheetah/dtos/extension/condition.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConditionService } from '../services/condition.service';

@ApiTags('Condition')
@Controller('extension/condition')
export class ConditionController {
  constructor(private readonly condtionService: ConditionService) {}

  @Post()
  @ApiResponse({ type: ConditionDto })
  async addCondition(
    @Body() conditionDto: ConditionDto,
  ): Promise<ConditionDto> {
    conditionDto.companyId = 'STATIC_CID';
    return await this.condtionService.addCondtion(conditionDto);
  }

  @Get()
  @ApiExtraModels(ConditionDto)
  @ApiPaginationResponse(ConditionDto, 'getCondtionsList')
  async getCondtionsList(
    @Query() conditionDto?: Partial<ConditionDto>,
  ): Promise<PaginationDto<ConditionDto>> {
    conditionDto.companyId = 'STATIC_CID';
    const data = await this.condtionService.getCondtionsList(conditionDto);
    return {
      data,
      more: false,
    };
  }
}
