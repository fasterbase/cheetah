import { CustomSegmentDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SegmentDocument, Segment } from './../../schemas/segment.schema';

@Injectable()
export class ConditionRepository {
  constructor(
    @InjectModel(Segment.name) private segmentModel: Model<SegmentDocument>,
  ) {}

  async insertOneCustomSegment(
    customSegmentDto: CustomSegmentDto,
  ): Promise<SegmentDocument> {
    return await (await this.segmentModel.create(customSegmentDto)).toObject();
  }

  async findOneCustomSegment(
    customSegmentDto: CustomSegmentDto,
  ): Promise<boolean> {
    const isExist = await await this.segmentModel.exists({
      companyId: customSegmentDto.companyId,
      name: customSegmentDto.name,
    });
    return isExist ? true : false;
  }

  async findCustomSegment(
    companyId: CustomSegmentDto['companyId'],
  ): Promise<SegmentDocument[]> {
    return JSON.parse(
      JSON.stringify(await this.segmentModel.find({ companyId })),
    );
  }

  async removeSegment(customSegmentDto: CustomSegmentDto): Promise<boolean> {
    await this.segmentModel.deleteOne({ customSegmentDto });
    return true;
  }

  async removeTestData() {
    await this.removeSegment({
      name: '_test',
      companyId: 'STATIC_CID',
    });
  }
}
