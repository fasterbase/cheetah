import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { ErrorHandlerService } from '@cheetah/error-handler';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class DeviceRepository {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async insertOne(deviceDto: DeviceDto) {
    return await this.deviceModel.create(deviceDto);
  }

  async findOne(options: {
    companyId: string;
    filter: Partial<DeviceDto>;
  }): Promise<Device> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const device = await this.deviceModel.findOne({
      filter,
    });

    if (device) return device.toObject();
    throw new NotFoundException('Device not found');
  }

  async findMany(options: {
    companyId: string;
    filter?: Partial<DeviceDto>;
  }): Promise<Device[]> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const devices = await this.deviceModel.find({
      filter,
    });

    if (devices) return devices.map((device) => device.toObject());
    throw new NotFoundException('Devices not found');
  }

  async addOrUpdateOutput(outputDto: OutputDto) {
    //@todo optimize query
    const device = await this.findOne({
      companyId: outputDto.companyId,
      filter: { _id: outputDto._id },
    });
    let isOutPutExist = false;
    if (device?.outputs?.length) {
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
  }
}
