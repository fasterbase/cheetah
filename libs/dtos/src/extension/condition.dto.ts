import { Compare, Operation, Segment } from '@cheetah/constants/device';
import { ApiProperty } from '@nestjs/swagger';
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
  name: string;

  @ApiProperty({ required: true })
  @IsEnum(Segment)
  segment: Segment;

  @ApiProperty({ required: true })
  @IsEnum(Operation)
  operation: Operation;

  @ApiProperty({ required: true })
  @IsNumber()
  threshold: number;

  @ApiProperty({ required: true })
  @IsEnum(Compare)
  compare: Compare;

  @ApiProperty({ required: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  customPeriod?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  customValue?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  customUserInput?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  customOperationValue?: number;

  companyId?: string;
  id?: string;
}
