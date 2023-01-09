import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CustomFunctionInput {
  @ApiProperty({ required: true, type: String })
  id: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  type: string;
}

export class CustomFunctionDto extends DTOVerification<CustomFunctionDto>() {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
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
