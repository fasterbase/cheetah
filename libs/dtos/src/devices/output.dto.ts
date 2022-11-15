import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class OutputDto extends DTOVerification<OutputDto>() {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  _id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  key?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  companyId?: string;
}
