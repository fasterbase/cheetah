import { ActionType } from '@cheetah/constants/extension';
import { Operation, Query } from '@cheetah/constants/storage';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class MarketType {
  @ApiProperty({ required: true, type: Number })
  @IsMongoId()
  id: string;
}

export class OrderType {
  @ApiProperty({ required: true, type: Number })
  @IsMongoId()
  id: string;
}

export class DatabaseType {
  @ApiProperty({ required: true, type: String, enum: Operation })
  @IsEnum(Operation)
  operation: Operation;

  @ApiProperty({ required: true, type: String, enum: Query })
  @IsEnum(Operation)
  query: Query;

  @ApiProperty({ required: true, type: Object })
  @IsNotEmptyObject()
  @IsObject()
  data: any;
}

export class Actions {
  @ApiProperty({ required: true, enum: ActionType })
  @IsEnum(ActionType)
  type: ActionType;

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  priority: number;

  @ApiProperty({ required: false, type: MarketType })
  @Type(() => MarketType)
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateIf((o) => o.type === ActionType.Market)
  market?: MarketType;

  @ApiProperty({ required: false, type: ActionType.Order })
  @Type(() => MarketType)
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateIf((o) => o.type === OrderType)
  order?: OrderType;

  @ApiProperty({ required: false, type: ActionType.Order })
  @Type(() => MarketType)
  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateIf((o) => o.type === MarketType)
  database?: OrderType;
}