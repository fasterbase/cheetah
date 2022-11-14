import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';

@Module({
  imports: [WinstonModule.forRoot({})],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
