import {
  VALID_EMAIL,
  REQUIRED_FIRST_NAME,
  REQUIRED_LAST_NAME,
  REQUIRED_ADDRESS,
  REQUIRED_DOCUMENT,
  VALID_CREATE_CUSTOMER
} from '../constants/errors';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const blueprintCreateCustomer = Joi.object().keys({
  id: Joi.string().allow(null),
  firstName: Joi.string().required().label(REQUIRED_FIRST_NAME),
  lastName: Joi.string().required().label(REQUIRED_LAST_NAME),
  phone: Joi.string().allow(null),
  address: Joi.string().required().label(REQUIRED_ADDRESS),
  document: Joi.string().required().label(REQUIRED_DOCUMENT),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .label(VALID_EMAIL),
  avatar: Joi.string().allow(null)
});

const validateCreateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = blueprintCreateCustomer.validate(req.body, {
    abortEarly: false,
    convert: false
  });
  if (validationResult.error) {
    res.status(400).json({
      message: VALID_CREATE_CUSTOMER,
      errors: validationResult.error.details.map(
        (error) => error.context?.label
      )
    });
  } else {
    next();
  }
};

export { validateCreateCustomer };
