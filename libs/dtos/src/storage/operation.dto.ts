import { Operation } from '@cheetah/constants/storage';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class OperationDto extends DTOVerification<OperationDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Operation })
  @IsEnum(Operation)
  value: Operation;
}
