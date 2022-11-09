import { DeviceDto } from '@cheetah/dtos/devices';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../repositories/device.repository';
import { ErrorHandlerService } from '@cheetah/error-handler/error-handler.service';
import { DeviceErrorCode } from '@cheetah/error-handler/enums';
@Injectable()
export class DeviceService {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly deviceHelper: DeviceRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async addNewDevice(deviceDto: DeviceDto): Promise<Device> {
    try {
      deviceDto.companyId = 'STATIC_CID';
      const existDevice = await this.deviceHelper.findDevice({
        companyId: deviceDto.companyId,
        name: deviceDto.name,
      });
      if (!existDevice) return await this.deviceModel.create(deviceDto);
      this.errorHandlerService.error({
        code: DeviceErrorCode.DEVICE_EXIST,
      });
    } catch (e) {
      this.errorHandlerService.error({
        code: DeviceErrorCode.DEVICE_UNKNOWN,
        error: e,
      });
    }
  }

  async getDevices(options: {
    companyId: Partial<DeviceDto['companyId']>;
  }): Promise<Device[]> {
    try {
      const { companyId } = options;
      return await this.deviceHelper.findDevices({
        companyId,
      });
    } catch (e) {
      this.errorHandlerService.error({
        code: DeviceErrorCode.DEVICE_UNKNOWN,
        error: e,
      });
    }
  }
}
