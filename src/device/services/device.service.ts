import { DeviceDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceErrorHandler } from '../error.handler';
@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceErrorHandler: DeviceErrorHandler,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  async addNewDevice(deviceDto: DeviceDto): Promise<Device> {
    try {
      const data = await this.deviceModel.create(deviceDto);
      return data;
    } catch (e) {
      this.deviceErrorHandler.mongoose(e);
    }
  }
}
