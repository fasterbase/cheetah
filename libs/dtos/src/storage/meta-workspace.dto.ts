import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { DTOVerification } from '../base.dto';
import { WorkSpaceDto } from './workspace.dto';

export class MetaWorkSpaceDto extends DTOVerification<MetaWorkSpaceDto>() {
  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  workspaces?: WorkSpaceDto[];

  workspaceLimit?: number;
  companyId?: string;
}
