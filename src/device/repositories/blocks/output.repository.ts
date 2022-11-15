import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../../schemas/device.schema';
import { nanoid } from 'nanoid';
import { DeviceRepository } from '../device.repository';

@Injectable()
export class OutputRepository {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async addOrUpdateOutput(outputDto: OutputDto) {
    //@todo optimize query
    const isOutputExist = await this.isOutputExist(outputDto);
    if (isOutputExist === null) return false;
    if (isOutputExist) {
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
            outputs: {
              key: outputDto.key || nanoid(),
              name: outputDto.name,
              active: outputDto.active,
            },
          },
        },
      );
    }

    return true;
  }

  async updateActiveStatus(outputDto: OutputDto): Promise<boolean> {
    const isOutputExist = await this.isOutputExist(outputDto);
    if (isOutputExist) {
      await this.deviceModel.updateOne(
        {
          _id: outputDto._id,
          companyId: outputDto.companyId,
          'outputs.name': outputDto.name,
        },
        { $set: { 'outputs.$.active': outputDto.active } },
      );
      return true;
    }
    return false;
  }

  async isOutputExist(outputDto: OutputDto): Promise<boolean> {
    const device = await this.deviceRepository.findOne({
      companyId: outputDto.companyId,
      filter: { _id: outputDto._id },
    });
    if (!device) return null;
    let isOutPutExist = false;
    if (device.outputs?.length) {
      isOutPutExist =
        device.outputs.findIndex((output) => output.name === outputDto.name) ===
        -1
          ? false
          : true;
    }
    return isOutPutExist;
  }
}
