import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
  Scope,
} from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
//'winston'
@Injectable()
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  static _logger: WinstonLogger;
  context: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {
    this.context = 'WithoutContext';
  }

  setContext(context: string) {
    this.context = context;
  }

  static getLogger(): WinstonLogger {
    return LoggerService._logger;
  }

  static transformLog(message: any, meta: any[], context?: string) {
    if (context) meta['context'] = context;
    return { _message: message, _meta: meta };
  }

  static debug(message: any, ...meta: any[]): void {
    this.getLogger().debug(message, meta);
  }

  static verbose(message: any, ...meta: any[]): void {
    this.getLogger().verbose(message, meta);
  }

  static log(message: any, ...meta: any[]): void {
    this.getLogger().info(message, meta);
  }

  static warn(message: any, ...meta: any[]): void {
    this.getLogger().warn(message, meta);
  }

  static error(message: any, ...meta: any[]): void {
    this.getLogger().error(message, meta);
  }

  verbose(message: any, ...meta: any[]): void {
    this.logger.verbose(message, meta);
  }

  debug(message: any, ...meta: any[]): void {
    this.logger.debug(message, meta);
  }

  log(message: any, ...meta: any[]): void {
    const { _message, _meta } = LoggerService.transformLog(
      message,
      meta,
      this.context,
    );
    this.logger.info(_message, _meta);
  }

  warn(message: any, ...meta: any[]): void {
    this.logger.warn(message, meta);
  }

  error(message: any, ...meta: any[]): void {
    const { _message, _meta } = LoggerService.transformLog(
      message,
      meta,
      this.context,
    );
    this.logger.error(_message, _meta);
  }
}
