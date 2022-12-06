import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';
import { Segment as SegmentEnum } from '@cheetah/constants/device';

export class SegmentDto extends DTOVerification<SegmentDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: SegmentEnum })
  @IsEnum(SegmentEnum)
  value: SegmentEnum;
}
