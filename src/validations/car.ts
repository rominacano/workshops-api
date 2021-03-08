import {
  REQUIRED_PATENT,
  REQUIRED_BRAND,
  REQUIRED_MODEL,
  REQUIRED_YEAR,
  REQUIRED_CUSTOMER,
  VALID_CREATE_CAR
} from '../constants/errors';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const blueprintCreateCar = Joi.object().keys({
  id: Joi.string().allow(null),
  patent: Joi.string().required().label(REQUIRED_PATENT),
  brand: Joi.string().required().label(REQUIRED_BRAND),
  carModel: Joi.string().required().label(REQUIRED_MODEL),
  year: Joi.number().required().label(REQUIRED_YEAR),
  engine: Joi.string().allow(null),
  chassis: Joi.string().allow(null),
  customerId: Joi.string().required().label(REQUIRED_CUSTOMER)
});

const validateCreateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = blueprintCreateCar.validate(req.body, {
    abortEarly: false,
    convert: false
  });
  if (validationResult.error) {
    res.status(400).json({
      message: VALID_CREATE_CAR,
      errors: validationResult.error.details.map(
        (error) => error.context?.label
      )
    });
  } else {
    next();
  }
};

export { validateCreateCar };
