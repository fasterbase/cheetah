import { DeviceDto } from '@cheetah/dtos/devices';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
  async addNewDevice(deviceDto: DeviceDto): Promise<Device | void> {
    try {
      return await this.deviceModel.create(deviceDto);
    } catch (e) {
      this.deviceErrorHandler.mongoose(e);
    }
  }
}
