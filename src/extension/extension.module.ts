import { LoggerModule } from '@cheetah/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configValidationSchema } from './config.schema';
import { ExtensionService } from './services/command.service';
import { CommandRepository } from './repositories/command.repository';
import { Command, CommandSchema } from './schemas/order.schema';
import { ExtensionController } from './controllers/command.controller';
import { ExtensionTestController } from './controllers/extension.test.controller';
import { ActionExtensionController } from './controllers/action.controller';
import { ActionExtensionService } from './services/action.service';
import { Action, ActionSchema } from './schemas/action.schema';
import { ActionRepository } from './repositories/action.repository';

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
      { name: Command.name, schema: CommandSchema },
      { name: Action.name, schema: ActionSchema },
    ]),
    LoggerModule,
  ],
  providers: [
    ExtensionService,
    ActionExtensionService,
    CommandRepository,
    ActionRepository,
  ],
  controllers: [
    ExtensionController,
    ActionExtensionController,
    ExtensionTestController,
  ],
})
export class ExtensionModule {}
