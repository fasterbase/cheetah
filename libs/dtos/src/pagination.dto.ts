import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationDto<T> {
  @IsObject()
  @IsArray()
  data: T[];

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  token?: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  more: boolean;
}
