import { ActionList } from '@cheetah/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionListDto extends DTOVerification<ActionListDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: ActionList })
  @IsEnum(ActionList)
  value: ActionList;
}
