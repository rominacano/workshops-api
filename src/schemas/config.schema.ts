import Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development')
    .allow('testing')
    .allow('production')
    .default('development'),
  MONGO_DB: Joi.string().required(),
  SERVER_PORT: Joi.string().required()
})
  .unknown()
  .required();

export default configSchema;
