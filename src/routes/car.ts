import express from 'express';
import { validateCreateCar } from '../validations';
import { createCar, getRepairsByCar } from '../controller';

const carRoutes = express.Router();

carRoutes.post('/', validateCreateCar, createCar);

carRoutes.get('/:id/repairs', getRepairsByCar);

export { carRoutes };
