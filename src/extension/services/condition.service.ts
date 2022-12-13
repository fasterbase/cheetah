import { ConditionDto } from '@cheetah/dtos/extension/condition.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConditionRepository } from '../repositories/condition.repository';

@Injectable()
export class ConditionService {
  constructor(private readonly conditionRepository: ConditionRepository) {}

  async addCondtion(conditionDto: ConditionDto): Promise<ConditionDto> {
    try {
      return await this.conditionRepository.insertOne(conditionDto);
    } catch (e) {
      throw new HttpException(
        'duplicate condition name',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCondtionsList(conditionDto: Partial<ConditionDto>) {
    return await this.conditionRepository.findMany({
      companyId: conditionDto.companyId,
    });
  }
}
