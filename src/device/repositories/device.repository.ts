import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { ErrorHandlerService } from '@cheetah/error-handler';
import { MongooseErrorCode } from '@cheetah/error-handler/enums';
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

  async findDeviceById(options: {
    deviceId: string;
    companyId: string;
  }): Promise<DeviceDto> {
    const { deviceId, companyId } = options;

    const device = await this.deviceModel.findOne({
      companyId,
      _id: deviceId,
    });

    if (device) return device.toObject();
    throw new NotFoundException('Device not found');
  }

  async findDeviceByName(options: { name: string; companyId: string }) {
    const { name, companyId } = options;
    return await this.deviceModel.findOne({ companyId, name });
  }

  //@todo implement filters
  async findDevices(options: {
    companyId: string;
    filter?: Partial<DeviceDto>;
  }) {
    const { companyId } = options;
    return await this.deviceModel.find({ companyId });
  }

  async addOrUpdateOutput(outputDto: OutputDto) {
    //@todo optimize query
    const device = await this.findDeviceById({
      deviceId: outputDto.deviceId,
      companyId: outputDto.companyId,
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
          _id: outputDto.deviceId,
          companyId: outputDto.companyId,
          'outputs.key': outputDto.key,
        },
        { $set: { 'outputs.$.name': outputDto.name } },
      );
    } else {
      await this.deviceModel.updateOne(
        {
          _id: outputDto.deviceId,
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
