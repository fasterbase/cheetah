import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configValidationSchema } from './config.schema';
import { DeviceController } from './controller/device.controller';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceRepository } from './repositories/device.repository';
import { LoggerModule } from '@cheetah/logger';
import { OutputBlockRepository } from './repositories/blocks/output.block.repository';
import { DeviceTestController } from './controller/device.test.controller';
import { DeviceBlockOutPutController } from './controller/blocks/output.controller';

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
  ],
  controllers: [
    DeviceController,
    DeviceTestController,
    DeviceBlockOutPutController,
  ],
  providers: [DeviceService, DeviceRepository, OutputBlockRepository],
})
export class DeviceModule {}
