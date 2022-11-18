import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class ColumnDto extends DTOVerification<ColumnDto>() {
  @ApiProperty({ type: String, minLength: 3 })
  @MinLength(3)
  @IsString()
  name: string;
}
