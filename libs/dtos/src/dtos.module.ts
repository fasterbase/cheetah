import { Module } from '@nestjs/common';
import { DtosService } from './dtos.service';

@Module({
  providers: [DtosService],
  exports: [DtosService],
})
export class DtosModule {}
