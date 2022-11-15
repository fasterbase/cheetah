import { SegmentDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../../repositories/device.repository';
import { LoggerService } from '@cheetah/logger';
import { OutputRepository } from '../../repositories/blocks/output.repository';

@Injectable()
export class ConidtionService {
  constructor(
    private readonly logger: LoggerService,
    private readonly deviceRepository: DeviceRepository,
    private readonly outputBlockRepository: OutputRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async getSegmentList(): Promise<SegmentDto[]> {
    return [];
  }
}
