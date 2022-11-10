import { DeviceDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../repositories/device.repository';
import { ErrorHandlerService } from '@cheetah/error-handler/error-handler.service';
import { DeviceErrorCode } from '@cheetah/error-handler/enums';
import { LoggerService } from '@cheetah/logger';
@Injectable()
export class DeviceService {
  constructor(
    private readonly logger: LoggerService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly deviceRepository: DeviceRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async addNewDevice(deviceDto: DeviceDto): Promise<Device> {
    deviceDto.companyId = 'STATIC_CID';
    const existDevice = await this.deviceRepository.findDeviceByName({
      companyId: deviceDto.companyId,
      name: deviceDto.name,
    });
    if (!existDevice) return await this.deviceModel.create(deviceDto);
    this.errorHandlerService.error({
      code: DeviceErrorCode.DEVICE_EXIST,
    });
  }

  async getDevices(options: {
    companyId: Partial<DeviceDto['companyId']>;
  }): Promise<Device[]> {
    try {
      const { companyId } = options;
      return await this.deviceRepository.findDevices({
        companyId,
      });
    } catch (e) {
      this.errorHandlerService.error({
        code: DeviceErrorCode.DEVICE_UNKNOWN,
        error: e,
      });
    }
  }

  async getDevice(options: {
    companyId: Partial<DeviceDto['companyId']>;
    deviceId: string;
  }): Promise<Device> {
    try {
      const { companyId, deviceId } = options;
      const data = await this.deviceRepository.findDeviceById({
        companyId,
        deviceId,
      });
      return data.toObject();
    } catch (e) {
      console.error(e);
      this.errorHandlerService.error({
        code: DeviceErrorCode.DEVICE_UNKNOWN,
        error: e,
      });
    }
  }
}
