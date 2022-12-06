import { ActionSource } from '@cheetah/constants/extension';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionSourceDto extends DTOVerification<ActionSourceDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ActionSource })
  @IsEnum(ActionSource)
  value: ActionSource;
}
