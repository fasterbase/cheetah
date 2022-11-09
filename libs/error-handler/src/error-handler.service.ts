import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeviceErrorCode, MongooseErrorCode } from './enums';
import { ErrorMapper } from './constant';

@Injectable()
export class ErrorHandlerService {
  // mongoose = (code?: MongooseErrorCode, message: string) => {
  //   // if (error instanceof Error.ValidationError) {
  //   //   const messages = Object.values(error.errors).map((err) => err.message);
  //   //   //throw new HttpException(JSON.stringify(messages), HttpStatus.BAD_REQUEST);
  //   //   console.error(JSON.stringify(messages));
  //   //   return;
  //   // } else if ((error as MongoError).code === 11000) {
  //   //   console.log({ error_code: (error as MongoError).code });
  //   // }
  //   console.error();
  //   // throw new HttpException(
  //   //   'Unhandled mongoose error on deviceService',
  //   //   HttpStatus.BAD_REQUEST,
  //   // );
  // };

  //@todo implement custom exepction
  error = (options: {
    code: DeviceErrorCode | MongooseErrorCode;
    error?: any;
    message?: string;
  }) => {
    const { code, error } = options;
    let { message } = options;
    if (!message) message = ErrorMapper[code];
    throw new HttpException(
      {
        code,
        message,
      },
      403,
    );
  };
}
