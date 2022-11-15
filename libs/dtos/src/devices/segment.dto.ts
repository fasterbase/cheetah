import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';
import { Segment as SegmentEnum } from '@cheetah/constants';

export class SegmentDto extends DTOVerification<SegmentDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: SegmentEnum })
  @IsEnum(SegmentEnum)
  value: SegmentEnum;
}
