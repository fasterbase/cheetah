import { Module } from '@nestjs/common';
import { WorkspaceService } from './services/workspace.service';
import { WorkspaceController } from './controllers/workspace.controller';
import { LoggerModule } from '@cheetah/logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configValidationSchema } from './config.schema';
import { WorkspaceRepository } from './repositories/workspace.repository';
import { Workspace, WorkspaceSchema } from './schemas/workspace.schema';
import { StorageTestController } from './controllers/storage.test.controller';

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
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    LoggerModule,
  ],
  providers: [WorkspaceService, WorkspaceRepository],
  controllers: [WorkspaceController, StorageTestController],
})
export class StorageModule {}
