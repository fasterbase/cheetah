import { ActionType } from '@cheetah/constants/extension';
import { Operation, Query } from '@cheetah/constants/storage';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class MarketInputParameter {
  @ApiProperty({ required: true, type: String })
  @IsString()
  id: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  value: string;
}

export class MarketType {
  @ApiProperty({ required: true, type: String })
  @IsString()
  id: string;

  @ApiProperty({ required: true, type: [MarketInputParameter] })
  @IsArray()
  @Type(() => MarketInputParameter)
  @ValidateNested()
  inputFields?: MarketInputParameter[];
}

export class CommandType {
  @ApiProperty({ required: true, type: String })
  @IsString()
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

export class ActionsDto {
  @ApiProperty({ required: true, enum: ActionType })
  @IsEnum(ActionType)
  type: ActionType;

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  priority: number;

  @ApiProperty({ required: false, type: MarketType })
  @ValidateIf((o) => o.type === ActionType.Market)
  @Type(() => MarketType)
  @ValidateNested()
  @IsObject()
  market?: MarketType;

  @ApiProperty({ required: false, type: CommandType })
  @ValidateIf((o) => o.type === ActionType.Command)
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => CommandType)
  @ValidateNested()
  command?: CommandType;

  @ApiProperty({ required: false, type: DatabaseType })
  @ValidateIf((o) => o.type === ActionType.Database)
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => DatabaseType)
  @ValidateNested()
  database?: DatabaseType;
}
