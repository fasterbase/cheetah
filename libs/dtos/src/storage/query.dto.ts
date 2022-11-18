import { Query } from '@cheetah/constants/storage';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class QueryDto extends DTOVerification<QueryDto>() {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: Query })
  @IsEnum(Query)
  value: Query;
}
