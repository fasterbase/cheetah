import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configValidationSchema } from './config.schema';
import { DeviceController } from './controller/device.controller';
import { DeviceService } from './services/device.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [__dirname + '/../.env'],
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
