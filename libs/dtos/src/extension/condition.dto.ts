import { Compare, Operation, Segment } from '@cheetah/constants/device';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ConditionDto extends DTOVerification<ConditionDto>() {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Segment, required: true })
  @IsEnum(Segment)
  segment: Segment;

  @ApiProperty({ enum: Operation, required: true })
  @IsEnum(Operation)
  operation: Operation;

  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  @IsNumber()
  threshold: number;

  @ApiProperty({ enum: Compare, required: true })
  @IsEnum(Compare)
  compare: Compare;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  customPeriod?: number;

  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  customValue?: number;

  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  customUserInput?: number;

  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  customOperationValue?: number;

  companyId?: string;
  id?: string;
}
