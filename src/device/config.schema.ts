import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  MONGO_PORT: Joi.number().default(27017).required(),
});
