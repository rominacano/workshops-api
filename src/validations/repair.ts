import {
  REQUIRED_STATUS,
  REQUIRED_TYPE,
  REQUIRED_DESCRIPTION,
  REQUIRED_CAR,
  VALID_CREATE_REPAIR,
  REQUIRED_TOTAL_AMOUNT
} from '../constants/errors';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const blueprintCreateRepair = Joi.object().keys({
  id: Joi.string().allow(null),
  type: Joi.string().required().label(REQUIRED_TYPE),
  description: Joi.string().required().label(REQUIRED_DESCRIPTION),
  status: Joi.string().required().label(REQUIRED_STATUS),
  totalAmount: Joi.number().required().label(REQUIRED_TOTAL_AMOUNT),
  carId: Joi.string().required().label(REQUIRED_CAR)
});

const validateCreateRepair = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = blueprintCreateRepair.validate(req.body, {
    abortEarly: false,
    convert: false
  });
  if (validationResult.error) {
    res.status(400).json({
      message: VALID_CREATE_REPAIR,
      errors: validationResult.error.details.map(
        (error) => error.context?.label
      )
    });
  } else {
    next();
  }
};

export { validateCreateRepair };
