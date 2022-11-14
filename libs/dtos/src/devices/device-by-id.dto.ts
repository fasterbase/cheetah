import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { DTOVerification } from '../base.dto';

export class DeviceByIdDto extends DTOVerification<DeviceByIdDto>() {
  @ApiProperty({ required: true })
  @IsMongoId()
  _id: string;
}
