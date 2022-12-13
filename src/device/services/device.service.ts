import { DeviceDto } from '@cheetah/dtos/devices';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceRepository } from '../repositories/device.repository';
import { LoggerService } from '@cheetah/logger';

@Injectable()
export class DeviceService {
  constructor(
    private readonly logger: LoggerService,
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
    throw new HttpException('Device is already exist', HttpStatus.CONFLICT);
  }

  async updateDevice(
    deviceId: string,
    deviceDto: Partial<DeviceDto>,
  ): Promise<boolean> {
    const companyId = deviceDto.companyId;
    if (!companyId && !deviceId)
      throw new HttpException(
        'device can not be authorized',
        HttpStatus.BAD_REQUEST,
      );
    delete deviceDto.companyId;
    delete deviceDto._id;

    return await this.deviceRepository.updateOne({
      companyId,
      deviceId,
      deviceDto,
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
}
