import { CustomFunctionDto } from '@cheetah/dtos/extension/custom-function.dto';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CustomFunctionRepository } from '../repositories/custom-function.repository';

@Injectable()
export class CustomFunctionService {
  constructor(
    private readonly customFunctionRepository: CustomFunctionRepository,
  ) {
    //this.newCustomFunction();
  }

  async newCustomFunction(options: { filePath: string; companyId: string }) {
    await this.customFunctionRepository.insertOne({
      filePath: options.filePath,
      companyId: options.companyId,
      isVerified: false,
      isPublic: false,
      status: false,
    });
  }

  async customFunctionsList(
    companyId: CustomFunctionDto['companyId'],
  ): Promise<CustomFunctionDto[]> {
    return await this.customFunctionRepository.findMany({ companyId });
  }
}
