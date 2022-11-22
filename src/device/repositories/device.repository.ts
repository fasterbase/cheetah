import { DeviceDto } from '@cheetah/dtos/devices';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';

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
    let { filter } = options;
    const { companyId } = options;
    if (!filter) filter = { companyId };
    filter.companyId = companyId;

    const devices = await this.deviceModel.find(filter);

    if (devices)
      return devices.map((device) => {
        const data = device.toObject();
        data['id'] = data._id;
        return data;
      });
    throw new NotFoundException('Devices not found');
  }

  async removeTestData() {
    await this.deviceModel.deleteOne({ name: '_test_devices' });
  }
}
