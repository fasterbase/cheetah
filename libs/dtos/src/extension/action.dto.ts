import { ActionType } from '@cheetah/constants/extension';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ActionDto extends DTOVerification<ActionDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  deviceId: string;
}
