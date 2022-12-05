import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { PaginationDto } from '@cheetah/dtos';
import { CustomFunctionDto } from '@cheetah/dtos/extension/custom-function.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CustomFunctionService } from '../services/custom-function.service';

@ApiTags('Functions')
@Controller('extension/function')
export class CustomFuntionController {
  constructor(
    private readonly customFunctionExtensionService: CustomFunctionService,
  ) {}

  @ApiExtraModels(CustomFunctionDto)
  @ApiPaginationResponse(CustomFunctionDto, 'getFunctionsList')
  @Get()
  async getFunctionsList(): Promise<PaginationDto<CustomFunctionDto>> {
    const companyId = 'STATIC_CID';
    const data = await this.customFunctionExtensionService.customFunctionsList(
      companyId,
    );
    return {
      data,
      more: false,
    };
  }
}
