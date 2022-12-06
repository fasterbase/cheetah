import { LoggerModule } from '@cheetah/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configValidationSchema } from './config.schema';

import { ExtensionService } from './services/command.service';
import { ActionExtensionService } from './services/action.service';

import { CommandRepository } from './repositories/command.repository';
import { ActionRepository } from './repositories/action.repository';
import { CustomFunctionRepository } from './repositories/custom-function.repository';

import { ExtensionController } from './controllers/command.controller';
import { ExtensionTestController } from './controllers/extension.test.controller';
import { CustomFuntionController } from './controllers/custom-function.controller';
import { ActionExtensionController } from './controllers/action.controller';

import { Action, ActionSchema } from './schemas/action.schema';
import { Command, CommandSchema } from './schemas/command.schema';
import {
  CustomFunction,
  CustomFunctionSchema,
} from './schemas/custom-function.schema';

import { CustomFunctionService } from './services/custom-function.service';

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
      { name: CustomFunction.name, schema: CustomFunctionSchema },
    ]),
    LoggerModule,
  ],
  providers: [
    ExtensionService,
    CommandRepository,

    ActionExtensionService,
    ActionRepository,

    CustomFunctionService,
    CustomFunctionRepository,
  ],
  controllers: [
    ExtensionController,
    ActionExtensionController,
    CustomFuntionController,
  ],
})
export class ExtensionModule {}
