import { ActionType } from '@cheetah/constants/extension';
import { Operation, Query } from '@cheetah/constants/storage';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DTOVerification } from '../base.dto';

export class MarketType {
  @ApiProperty({ type: Number })
  @IsMongoId()
  id: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  priority: number;
}

export class OrderType {
  @ApiProperty({ type: Number })
  @IsMongoId()
  id: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  priority: number;
}

export class DatabaseType {
  @ApiProperty({ type: String, enum: Operation })
  @IsEnum(Operation)
  operation: Operation;

  @ApiProperty({ type: String, enum: Query })
  @IsEnum(Operation)
  query: Query;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  data: any;

  @ApiProperty({ type: Number })
  @IsNumber()
  priority: number;
}

export class Action {
  @IsEnum(ActionType)
  type: ActionType;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type((obj) => {
    switch (obj.object.type as ActionType) {
      case ActionType.Market:
        return MarketType;
      case ActionType.Database:
        return DatabaseType;
      case ActionType.Order:
        return OrderType;
    }
    throw new HttpException('type is not valid', HttpStatus.BAD_REQUEST);
  })
  @ValidateNested()
  data: MarketType;
}

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

  @ApiProperty({ required: true, type: Boolean })
  @IsArray()
  @Type(() => Action)
  @ValidateNested({ each: true })
  actions: Action[];

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  status: boolean;

  externalUrl?: string;
  companyId?: string;
}
