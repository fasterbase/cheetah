import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function DTOVerification<T>() {
  return class Verify {
    static validate(object: any): T {
      try {
        console.log({ deata: object.outputs });
        if (typeof object !== 'object' || object === null)
          throw new HttpException('DTO type is not a valid object', 403);
        const classed = plainToInstance(this, object);
        const errors = validateSync(classed);
        console.log('1');
        if (errors.length > 0) {
          const errorText = errors.map((e) => Object.values(e.constraints)[0]);
          console.log('2');
          throw new HttpException(
            JSON.stringify(errorText),
            HttpStatus.FORBIDDEN,
          );
        } else {
          return <T>object;
        }
      } catch (e) {
        throw new HttpException(e.message, 403);
      }
    }

    static arrayValidate(objects: any[]): T[] {
      return objects.map((object) => this.validate(object));
    }
  };
}
