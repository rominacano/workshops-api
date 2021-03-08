import { CAR_NO_FOUND } from './../constants/errors';
import { CUSTOMER_NO_FOUND, CAR_EXISTS } from '../constants/errors';
import { Request, Response } from 'express';
import { getCustomerById, getRepairByCarId } from '.';
import { Car } from '../models';

const createCar = async (req: Request, res: Response) => {
  const {
    patent,
    brand,
    carModel,
    year,
    engine,
    chassis,
    customerId
  } = req.body;

  const existingCar = await Car.findOne({ patent });

  if (existingCar) {
    res.status(400).json({
      message: CAR_EXISTS
    });
  }

  const exitsCustomer = await getCustomerById(customerId);
  if (!exitsCustomer) {
    res.status(400).json({
      message: CUSTOMER_NO_FOUND
    });
  }

  let newCar = new Car({
    patent,
    brand,
    carModel,
    year,
    engine,
    chassis,
    customer: customerId
  });

  newCar = await newCar.save();

  res.status(201).send(newCar);
};

const getCarById = async (carId: string) => {
  return await Car.findOne({ _id: carId });
};

const getCarsByCustomerId = async (customerId: string) => {
  return await Car.find({ customer: customerId });
};

const getRepairsByCar = async (req: Request, res: Response) => {
  const id = req.params.id;
  const exitsCar = await getCarById(id);
  if (!exitsCar) {
    res.status(400).json({
      message: CAR_NO_FOUND
    });
  }
  const repairs = await getRepairByCarId(id);
  res.status(200).send({ repairs });
};

export { createCar, getCarById, getCarsByCustomerId, getRepairsByCar };
