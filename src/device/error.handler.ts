import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DeviceErrorHandler {
  mongoose = (error) => {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      //throw new HttpException(JSON.stringify(messages), HttpStatus.BAD_REQUEST);
      console.error(JSON.stringify(messages));
      return;
    } else if ((error as MongoError).code === 11000) {
      console.log({ error_code: (error as MongoError).code });
    }
    console.error(error);
    // throw new HttpException(
    //   'Unhandled mongoose error on deviceService',
    //   HttpStatus.BAD_REQUEST,
    // );
  };
}
