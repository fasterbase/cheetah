import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';
import { AuthorizeModule } from './authorize/authorize.module';

@Module({
  imports: [GatewayModule, DeviceModule, AuthorizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
