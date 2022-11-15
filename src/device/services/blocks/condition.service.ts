import { CustomSegmentDto, SegmentDto } from '@cheetah/dtos/devices';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Segment, SegmentMapper } from '@cheetah/constants';
import { ConditionRepository } from './../../repositories/blocks/condition.repository';
import { nanoid } from 'nanoid';

@Injectable()
export class ConidtionService {
  constructor(private readonly conditionRepository: ConditionRepository) {}

  async getSegmentList(): Promise<SegmentDto[]> {
    return Object.keys(SegmentMapper).map((key) => {
      const segment = key as unknown as Segment;
      return {
        name: SegmentMapper[key],
        value: segment,
      };
    });
  }

  async createCustomSegmentList(
    customSegmentDto: CustomSegmentDto,
  ): Promise<CustomSegmentDto> {
    const isCustomSegmentExist =
      await this.conditionRepository.findOneCustomSegment(customSegmentDto);

    if (isCustomSegmentExist)
      throw new HttpException('duplicate data', HttpStatus.BAD_REQUEST);

    if (this.conditionRepository.findOneCustomSegment(customSegmentDto))
      customSegmentDto.value = nanoid();
    return await this.conditionRepository.insertOneCustomSegment(
      customSegmentDto,
    );
  }

  async getCustomSegmentList(
    companyId: CustomSegmentDto['companyId'],
  ): Promise<CustomSegmentDto[]> {
    return await this.conditionRepository.findCustomSegment(companyId);
  }
}
