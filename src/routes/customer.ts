import express from 'express';
import { validateCreateCustomer } from '../validations';
import {
  createCustomer,
  getAllCustomers,
  getCustomer,
  getCarsByCustomer
} from '../controller';

const customerRoutes = express.Router();

customerRoutes.post('/', validateCreateCustomer, createCustomer);

customerRoutes.get('/', getAllCustomers);

customerRoutes.get('/:id/cars', getCarsByCustomer);

customerRoutes.get('/:id', getCustomer);

export { customerRoutes };
