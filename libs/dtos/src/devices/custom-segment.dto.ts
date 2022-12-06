import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class CustomSegmentDto extends DTOVerification<CustomSegmentDto>() {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  value?: string;
  companyId: string;
}
