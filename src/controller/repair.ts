import { CAR_NO_FOUND } from '../constants/errors';
import { Request, Response } from 'express';
import { getCarById } from '.';
import { Repair } from '../models';

const createRepair = async (req: Request, res: Response) => {
  const { type, description, status, carId } = req.body;

  const exitsCar = await getCarById(carId);

  if (!exitsCar) {
    res.status(400).json({
      message: CAR_NO_FOUND
    });
  }

  let newRepair = new Repair({
    type,
    description,
    status,
    car: carId
  });

  newRepair = await newRepair.save();

  res.status(201).send(newRepair);
};

const getRepairByCarId = async (carId: string) => {
  return await Repair.find({ car: carId })
    .populate('car')
    .sort({ createdAt: 1 });
};

const getAllRepairs = async (req: Request, res: Response) => {
  const repairs = await Repair.find().populate('car').sort({ createdAt: 1 });
  res.status(200).send({ repairs });
};

export { createRepair, getRepairByCarId, getAllRepairs };
