import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CommandDto extends DTOVerification<CommandDto>() {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  commandId?: string;

  @ApiProperty({ required: true })
  @ValidateIf((o) => !o.filter)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name?: string;

  @ApiProperty({ required: true })
  @ValidateIf((o) => !o.filter)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @ValidateIf((o) => !o.filter)
  deviceId?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.filter)
  parameterName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.filter)
  parameterValue?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  filter? = false;

  companyId?: string;
}
