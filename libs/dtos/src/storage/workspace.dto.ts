import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class WorkSpaceDto extends DTOVerification<WorkSpaceDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  columns? = [];

  columnLimit? = 2;
}
