import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from './schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Segment, SegmentDocument } from './schemas/segment.schema';

@Injectable()
export class DeviceInitService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Segment.name) private segmentModel: Model<SegmentDocument>,
  ) {}

  async start() {}
}
