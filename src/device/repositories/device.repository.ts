import { DeviceDto } from '@cheetah/dtos/devices';
import { ErrorHandlerService } from '@cheetah/error-handler';
import { MongooseErrorCode } from '@cheetah/error-handler/enums';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';

@Injectable()
export class DeviceRepository {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async findDevice(options: { name: string; companyId: string }) {
    const { name, companyId } = options;
    const findQuery: DeviceDto = {
      name,
      companyId: companyId,
    };
    try {
      return await this.deviceModel.findOne(findQuery);
    } catch (error) {
      this.errorHandlerService.error({
        code: MongooseErrorCode.UNKNOWN,
        error,
      });
    }
  }

  //@todo implement filters
  async findDevices(options: {
    companyId: string;
    filter?: Partial<DeviceDto>;
  }) {
    const { companyId } = options;
    try {
      return await this.deviceModel.find({ companyId });
    } catch (error) {
      this.errorHandlerService.error({
        code: MongooseErrorCode.UNKNOWN,
        error,
      });
    }
  }
}
