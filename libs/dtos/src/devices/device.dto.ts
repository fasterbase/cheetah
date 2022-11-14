import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Min, MinLength } from 'class-validator';
import { DTOVerification } from '../base.dto';
import { OutputDto } from './output.dto';

export class DeviceDto extends DTOVerification<DeviceDto>() {
  @ApiProperty({ required: true })
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  outputs?: OutputDto[];
  companyId?: string;
  _id?: string;
}
