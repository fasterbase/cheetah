import { ActionType } from '@cheetah/constants/extension';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionTypeDto extends DTOVerification<ActionTypeDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ActionType })
  @IsEnum(ActionType)
  value: ActionType;
}
