import { DeviceDto } from '@cheetah/dtos/devices';
import { DeviceService } from '../services/device.service';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    addNewDevice(deviceDto: DeviceDto): DeviceDto;
}
