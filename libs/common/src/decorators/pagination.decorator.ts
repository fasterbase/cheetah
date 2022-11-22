import { PaginationDto } from '@cheetah/dtos';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginationResponse = <TModel extends Type<any>>(
  model: TModel,
  title: string,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title,
        allOf: [
          { $ref: getSchemaPath(PaginationDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
