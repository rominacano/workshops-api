import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import { customerRoutes, carRoutes, repairRoutes } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(cors());
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/repairs', repairRoutes);

export { app };
