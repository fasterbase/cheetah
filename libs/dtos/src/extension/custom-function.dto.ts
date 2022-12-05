import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CustomFunctionInput {
  @ApiProperty({ required: true, type: String })
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  type: string;
}

export class CustomFunctionDto extends DTOVerification<CustomFunctionDto>() {
  @ApiProperty({ required: true, type: String })
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({ required: true, type: String })
  url: string;

  @ApiProperty({ required: true, type: () => [CustomFunctionInput] })
  @IsOptional()
  @IsArray()
  @Type(() => CustomFunctionInput)
  @ValidateNested({ each: true })
  inputs?: CustomFunctionInput[];

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false, type: String })
  id?: string;

  companyId?: string;
}
