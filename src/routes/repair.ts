import express from 'express';
import { validateCreateRepair } from '../validations';
import { createRepair, getAllRepairs } from '../controller';

const repairRoutes = express.Router();

repairRoutes.post('/', validateCreateRepair, createRepair);

repairRoutes.get('/', getAllRepairs);

export { repairRoutes };
