import { ActionType } from '@cheetah/constants/extension';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionTypeDto extends DTOVerification<ActionTypeDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: ActionType })
  @IsEnum(ActionType)
  value: ActionType;
}
