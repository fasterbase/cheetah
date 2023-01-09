import { ApiPaginationResponse } from '@cheetah/common/decorators';
import { PaginationDto } from '@cheetah/dtos';
import { CustomFunctionDto } from '@cheetah/dtos/extension/custom-function.dto';
import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CustomFunctionService } from '../services/custom-function.service';

@ApiTags('Functions')
@Controller('extension/function')
export class CustomFuntionController {
  constructor(
    private readonly customFunctionExtensionService: CustomFunctionService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addNewCustomFunction(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'application/zip' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const companyId = 'STATIC_CID';
    await this.customFunctionExtensionService.newCustomFunction({
      filePath: file.path,
      companyId,
    });
    return { status: true };
  }

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
