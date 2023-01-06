import { PartialType } from '@nestjs/swagger';
import { CommandDto } from './command.dto';

export class UpdateCommandDto extends PartialType(CommandDto) {}
