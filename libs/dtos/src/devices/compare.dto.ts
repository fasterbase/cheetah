import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';
import { Compare } from '@cheetah/constants/device';

export class CompareDto extends DTOVerification<CompareDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Compare })
  @IsEnum(Compare)
  value: Compare;
}
