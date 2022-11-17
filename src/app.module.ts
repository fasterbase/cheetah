import { Module, RequestMethod } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';
import { AuthorizeModule } from './authorize/authorize.module';
import { ExtensionModule } from './extension/extension.module';
import * as winston from 'winston';
import { FilterDataMiddleware } from '@cheetah/common/middlewares';

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
    ExtensionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer): void {
    consumer
      .apply([FilterDataMiddleware])
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
