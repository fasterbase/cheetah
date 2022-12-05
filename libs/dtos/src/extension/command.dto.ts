import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CommandDto extends DTOVerification<CommandDto>() {
  @ApiProperty({ required: false })
  @IsString()
  id?: string;

  @ApiProperty({ required: true })
  @ValidateIf((o) => !o.filter)
  @MinLength(3)
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name?: string;

  @ApiProperty({ required: true })
  @ValidateIf((o) => !o.filter)
  @MinLength(3)
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description?: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @ValidateIf((o) => !o.filter)
  deviceId?: string;

  @ApiProperty({ required: true })
  @IsString()
  @ValidateIf((o) => !o.filter)
  parameterName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @ValidateIf((o) => !o.filter)
  parameterValue?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  filter? = false;

  companyId?: string;
}
