import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
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
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description?: string;

  @ApiProperty({ isArray: true, type: () => OutputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OutputDto)
  outputs?: OutputDto[];
}
