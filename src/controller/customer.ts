import { CUSTOMER_NO_FOUND, CUSTOMER_EXISTS } from '../constants/errors';
import { Request, Response } from 'express';
import { Customer } from '../models';
import { getCarsByCustomerId } from './car';

const createCustomer = async (req: Request, res: Response) => {
  const { document, firstName, lastName, phone, address, email } = req.body;

  const existingCustomer = await Customer.findOne({ document });

  if (existingCustomer) {
    res.status(400).json({
      message: CUSTOMER_EXISTS
    });
  }

  let newCustomer = new Customer({
    document,
    firstName,
    lastName,
    phone,
    address,
    email
  });
  newCustomer = await newCustomer.save();

  res.status(201).send(newCustomer);
};

const getCustomerById = async (CustomerId: string) => {
  return await Customer.findOne({ _id: CustomerId });
};

const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.find();
  res.status(200).send({ customers });
};

const getCarsByCustomer = async (req: Request, res: Response) => {
  const id = req.params.id;
  const exitsCustomer = await getCustomerById(id);
  if (!exitsCustomer) {
    res.status(400).json({
      message: CUSTOMER_NO_FOUND
    });
  }
  const carsCustomer = await getCarsByCustomerId(id);
  res.status(200).send({ cars: carsCustomer });
};

const getCustomer = async (req: Request, res: Response) => {
  const id = req.params.id;
  const exitsCustomer = await getCustomerById(id);
  if (!exitsCustomer) {
    res.status(400).json({
      message: CUSTOMER_NO_FOUND
    });
  }
  const carsCustomer = await getCarsByCustomerId(id);
  res
    .status(200)
    .send({ customer: { details: exitsCustomer, cars: carsCustomer } });
};

export {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  getCarsByCustomer,
  getCustomer
};
