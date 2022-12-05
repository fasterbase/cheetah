import { CustomFunctionDto } from '@cheetah/dtos/extension/custom-function.dto';
import { Injectable } from '@nestjs/common';
import { CustomFunctionRepository } from '../repositories/custom-function.repository';

@Injectable()
export class CustomFunctionService {
  constructor(
    private readonly customFunctionRepository: CustomFunctionRepository,
  ) {
    //this.newCustomFunction();
  }

  async newCustomFunction(
    customFunctionDto?: CustomFunctionDto,
  ): Promise<CustomFunctionDto> {
    const a = await this.customFunctionRepository.insertOne({
      companyId: 'STATIC_CID',
      name: 'Send SMS',
      description: 'Send Welcome SMS',
      isPublic: true,
      url: 'http',
      inputs: [
        {
          name: 'phone',
          description: 'telephone number',
          type: 'number',
        },
      ],
      status: true,
    });
    console.log({ a });
    return a;
  }

  async customFunctionsList(
    companyId: CustomFunctionDto['companyId'],
  ): Promise<CustomFunctionDto[]> {
    return await this.customFunctionRepository.findMany({ companyId });
  }
}
