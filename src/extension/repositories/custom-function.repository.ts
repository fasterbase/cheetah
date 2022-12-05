import { CustomFunctionDto } from '@cheetah/dtos/extension/custom-function.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CustomFunction,
  CustomFunctionDocument,
} from '../schemas/custom-function.schema';

@Injectable()
export class CustomFunctionRepository {
  constructor(
    @InjectModel(CustomFunction.name)
    private customFunctionModel: Model<CustomFunctionDocument>,
  ) {}
  async insertOne(
    customFunctionDto: CustomFunctionDto,
  ): Promise<CustomFunctionDto> {
    const data = await this.customFunctionModel.create(customFunctionDto);
    return data.toObject();
  }

  async findMany(options: {
    companyId: CustomFunctionDto['companyId'];
    status?: boolean;
  }): Promise<CustomFunctionDto[]> {
    const { companyId, status = true } = options;
    const data = await this.customFunctionModel.find({ companyId, status });
    return data.map((d) => ({ id: d._id.toString(), ...d.toObject() }));
  }

  async removeTestData() {
    await this.customFunctionModel.deleteOne({ name: '_test' });
  }
}
