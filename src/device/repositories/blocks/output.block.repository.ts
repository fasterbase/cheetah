import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../../schemas/device.schema';
import { nanoid } from 'nanoid';
import { DeviceRepository } from '../device.repository';

@Injectable()
export class OutputBlockRepository {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async addOrUpdateOutput(outputDto: OutputDto) {
    //@todo optimize query
    const device = await this.deviceRepository.findOne({
      companyId: outputDto.companyId,
      filter: { _id: outputDto._id },
    });
    if (!device) return null;
    let isOutPutExist = false;
    if (device.outputs?.length) {
      isOutPutExist =
        device.outputs.findIndex((output) => output.key === outputDto.key) ===
        -1
          ? false
          : true;
    }
    if (isOutPutExist) {
      await this.deviceModel.updateOne(
        {
          _id: outputDto._id,
          companyId: outputDto.companyId,
          'outputs.key': outputDto.key,
        },
        { $set: { 'outputs.$.name': outputDto.name } },
      );
    } else {
      await this.deviceModel.updateOne(
        {
          _id: outputDto._id,
          companyId: outputDto.companyId,
        },
        {
          $push: {
            outputs: { key: outputDto.key || nanoid(), name: outputDto.name },
          },
        },
      );
    }

    return true;
  }
}
