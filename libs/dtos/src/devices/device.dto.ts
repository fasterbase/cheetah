import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class DeviceDto extends DTOVerification<DeviceDto>() {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  companyId?: string;
}
