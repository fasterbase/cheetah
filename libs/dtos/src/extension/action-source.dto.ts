import { ActionSource } from '@cheetah/constants/extension';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionSourceDto extends DTOVerification<ActionSourceDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: ActionSource })
  @IsEnum(ActionSource)
  value: ActionSource;
}
