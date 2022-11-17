import { LoggerModule } from '@cheetah/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configValidationSchema } from './config.schema';
import { ExtensionService } from './services/extension.service';
import { CommandRepository } from './repositories/command.repository';
import { Command, CommandSchema } from './schemas/order.schema';
import { ExtensionController } from './controllers/extension.controller';
import { ExtensionTestController } from './controllers/extension.test.controller';

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
    MongooseModule.forFeature([{ name: Command.name, schema: CommandSchema }]),
    LoggerModule,
  ],
  providers: [ExtensionService, CommandRepository],
  controllers: [ExtensionController, ExtensionTestController],
})
export class ExtensionModule {}
