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
import { ActionsDto } from './actions.dto';

export class ActionDto extends DTOVerification<ActionDto>() {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  isExternal: boolean;

  @ApiProperty({ required: true, type: () => [ActionsDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ActionsDto)
  @ValidateNested({ each: true })
  actions?: ActionsDto[];

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false, type: String })
  id?: string;

  @ApiProperty({ required: false, type: () => String })
  externalUrl?: string;

  companyId?: string;
}
