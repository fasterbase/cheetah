import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DTOVerification } from '../base.dto';
import { ActionsDto } from './actions.dto';

export class ActionDto extends DTOVerification<ActionDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  deviceId: string;

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

  externalUrl?: string;
  companyId?: string;
}
