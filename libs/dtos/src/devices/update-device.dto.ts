import { PartialType } from '@nestjs/swagger';
import { DeviceDto } from './device.dto';

export class UpdateDeviceDto extends PartialType(DeviceDto) {}
