import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FilterDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET' && (req.body?.filter || req.query?.filter))
      throw new HttpException(
        "You can just use 'filter' in GET methods ",
        HttpStatus.BAD_REQUEST,
      );
    next();
  }
}
