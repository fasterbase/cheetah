import { Operation } from '@cheetah/constants/device';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class OperationDto extends DTOVerification<OperationDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: Operation })
  @IsEnum(Operation)
  value: Operation;
}
