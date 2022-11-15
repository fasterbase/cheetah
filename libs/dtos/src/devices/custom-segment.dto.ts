import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CustomSegmentDto extends DTOVerification<CustomSegmentDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  value: string;
  companyId: string;
}
