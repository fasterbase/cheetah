import { DeviceDto, OutputDto } from '@cheetah/dtos/devices';
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
    const existDevice = await this.deviceRepository.findOne({
      companyId: deviceDto.companyId,
      filter: { name: deviceDto.name },
    });
    if (!existDevice) return await this.deviceRepository.insertOne(deviceDto);
    this.errorHandlerService.error({
      code: DeviceErrorCode.DEVICE_EXIST,
    });
  }

  async getDevices(options: {
    companyId: Partial<DeviceDto['companyId']>;
  }): Promise<Device[]> {
    const { companyId } = options;
    return await this.deviceRepository.findMany({
      companyId,
    });
  }

  async getDevice(options: {
    companyId: Partial<DeviceDto['companyId']>;
    deviceId: string;
  }): Promise<Device> {
    const { companyId, deviceId } = options;
    const data = await this.deviceRepository.findOne({
      companyId,
      filter: { _id: deviceId },
    });
    return data;
  }

  async addOrUpdateOutput(outputDto: OutputDto): Promise<boolean> {
    outputDto.companyId = 'STATIC_CID';
    await this.deviceRepository.addOrUpdateOutput(outputDto);
    return true;
  }
}
