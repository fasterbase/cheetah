import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class UpdateActionDto extends DTOVerification<UpdateActionDto>() {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  isExternal: boolean;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  status: boolean;
}
