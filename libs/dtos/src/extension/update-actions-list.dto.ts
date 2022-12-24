import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ActionsDto } from './actions.dto';

export class UpdateActionsListDto {
  @IsArray()
  @ApiProperty({ required: false, type: [ActionsDto] })
  @Type(() => ActionsDto)
  @ValidateNested({ each: true })
  data: ActionsDto[];
}
