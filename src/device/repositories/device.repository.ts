import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async insertOne(deviceDto: DeviceDto) {
    return (await this.deviceModel.create(deviceDto)).toObject();
  }

  async findOne(options: {
    companyId: string;
    filter: Partial<DeviceDto>;
  }): Promise<Device> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const device = await this.deviceModel.findOne(filter);

    if (device) return device.toObject();
    return null;
  }

  async findMany(options: {
    companyId: string;
    filter?: Partial<DeviceDto>;
  }): Promise<Device[]> {
    const { filter, companyId } = options;

    filter.companyId = companyId;

    const devices = await this.deviceModel.find(filter);

    if (devices) return devices.map((device) => device.toObject());
    throw new NotFoundException('Devices not found');
  }

  async removeTestData() {
    await this.deviceModel.deleteOne({ name: '_test_devices' });
  }
}
