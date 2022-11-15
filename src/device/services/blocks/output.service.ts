import { OutputDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OutputRepository } from '../../repositories/blocks/output.repository';

@Injectable()
export class OutputService {
  constructor(
    private readonly outputBlockRepository: OutputRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async addOrUpdateOutput(outputDto: OutputDto): Promise<boolean> {
    outputDto.companyId = 'STATIC_CID';
    outputDto.active = true;
    return await this.outputBlockRepository.addOrUpdateOutput(outputDto);
  }

  async updateActiveStatus(outputDto: OutputDto): Promise<boolean> {
    outputDto.companyId = 'STATIC_CID';
    return await this.outputBlockRepository.updateActiveStatus(outputDto);
  }
}
