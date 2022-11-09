import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class DeviceDto extends DTOVerification<DeviceDto>() {
  @ApiProperty()
  @IsString()
  name: string;

  companyId: string;
}
