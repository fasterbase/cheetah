import { DeviceDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceService {
  addNewDevice(deviceDto: DeviceDto) {
    return { deviceDto: 'sda' };
  }
}
