import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configValidationSchema } from './config.schema';
import { DeviceController } from './controller/device.controller';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceRepository } from './repositories/device.repository';
import { ErrorHandlerModule } from '@cheetah/error-handler';
import { LoggerModule } from 'libs/logger/src';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    LoggerModule,
    ErrorHandlerModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
