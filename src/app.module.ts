import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';
import { AuthorizeModule } from './authorize/authorize.module';
import { ExtensionsController } from './extensions/extensions.controller';
import { ExtensionsService } from './extensions/extensions.service';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.prettyPrint(),
            winston.format.timestamp(),
          ),
        }),
      ],
    }),
    GatewayModule,
    DeviceModule,
    AuthorizeModule,
  ],
  controllers: [AppController, ExtensionsController],
  providers: [AppService, ExtensionsService],
})
export class AppModule {}
