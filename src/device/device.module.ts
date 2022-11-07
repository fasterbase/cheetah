import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configValidationSchema } from './config.schema';
import { DeviceController } from './controller/device.controller';
import { DeviceService } from './services/device.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [__dirname + '/../.env'],
      validationSchema: configValidationSchema,
    }),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
