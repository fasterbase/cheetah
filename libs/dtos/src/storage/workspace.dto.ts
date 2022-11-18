import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class WorkSpaceDto extends DTOVerification<WorkSpaceDto>() {
  @ApiProperty({ type: String, minLength: 3 })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  columns? = [];

  columnLimit? = 2;
}
