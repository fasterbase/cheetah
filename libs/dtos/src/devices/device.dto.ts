import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DTOVerification } from '../base.dto';
import { OutputDto } from './output.dto';

export class DeviceDto extends DTOVerification<DeviceDto>() {
  @ApiProperty({ required: true })
  @MinLength(3)
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description?: string;

  @ApiProperty({ required: false, isArray: true, type: () => OutputDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OutputDto)
  outputs?: OutputDto[];

  @ApiProperty({ description: 'on response', required: false })
  companyId?: string;

  @ApiProperty({ description: 'on response', required: false })
  deviceId?: string;
}
