import { LoggerModule } from '@cheetah/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configValidationSchema } from './config.schema';

import { CommandService } from './services/command.service';
import { ActionExtensionService } from './services/action.service';

import { CommandRepository } from './repositories/command.repository';
import { ActionRepository } from './repositories/action.repository';
import { CustomFunctionRepository } from './repositories/custom-function.repository';

import { CommandController } from './controllers/command.controller';
import { CustomFuntionController } from './controllers/custom-function.controller';
import { ActionExtensionController } from './controllers/action.controller';

import { Action, ActionSchema } from './schemas/action.schema';
import { Command, CommandSchema } from './schemas/command.schema';
import {
  CustomFunction,
  CustomFunctionSchema,
} from './schemas/custom-function.schema';

import { CustomFunctionService } from './services/custom-function.service';
import { Condition, ConditionSchema } from './schemas/condition.schema';
import { ConditionController } from './controllers/condition.controller';
import { ConditionService } from './services/condition.service';
import { ConditionRepository } from './repositories/condition.repository';

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
      { name: Condition.name, schema: ConditionSchema },
    ]),
    LoggerModule,
  ],
  providers: [
    CommandService,
    CommandRepository,

    ActionExtensionService,
    ActionRepository,

    CustomFunctionService,
    CustomFunctionRepository,

    ConditionService,
    ConditionRepository,
  ],
  controllers: [
    CommandController,
    ActionExtensionController,
    CustomFuntionController,
    ConditionController,
  ],
})
export class ExtensionModule {}
