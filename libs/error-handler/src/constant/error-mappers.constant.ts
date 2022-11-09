import { DeviceErrorCode } from '../enums';
import { MongooseErrorCode } from '../enums/mongoose-error-codes.enum';

type ErrorKey = { [key in DeviceErrorCode]: string } & {
  [key in MongooseErrorCode]: string;
};

export const ErrorMapper: ErrorKey = {
  [DeviceErrorCode.DEVICE_UNKNOWN]: 'unknonw error',
  [DeviceErrorCode.DEVICE_EXIST]: 'devices is already exist',

  [MongooseErrorCode.UNKNOWN]: 'unknonw error',
  [MongooseErrorCode.EXIST_DATA]: 'data is already exist',
};
