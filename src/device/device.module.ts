import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configValidationSchema } from './config.schema';
import { DeviceController } from './controller/device.controller';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceRepository } from './repositories/device.repository';
import { LoggerModule } from '@cheetah/logger';
import { OutputRepository } from './repositories/blocks/output.repository';
import { DeviceTestController } from './controller/device.test.controller';
import { DeviceOutPutController } from './controller/blocks/output.controller';
import { DeviceConditionController } from './controller/blocks/condition.controller';
import { ConidtionService } from './services/blocks/condition.service';
import { OutputService } from './services/blocks/output.service';
import { Segment, SegmentSchema } from './schemas/segment.schema';
import { ConditionRepository } from './repositories/blocks/condition.repository';

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
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: Segment.name, schema: SegmentSchema },
    ]),
    LoggerModule,
  ],
  controllers: [
    DeviceController,
    DeviceTestController,
    DeviceOutPutController,
    DeviceConditionController,
  ],
  providers: [
    DeviceService,
    OutputService,
    ConidtionService,
    OutputRepository,
    DeviceRepository,
    ConditionRepository,
  ],
})
export class DeviceModule {}
