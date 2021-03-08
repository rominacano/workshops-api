import mongoose from 'mongoose';
import { app } from './app';
import config from './config';

const start = async () => {
  const options = {
    useNewUrlParser: true
  };

  mongoose.connect(config.mongoDb!, options).then(() => {
    console.log('Connected to MongoDb');
  });

  app.listen(config.serverPort, () => {
    console.log(`Listening on port ${config.serverPort}!!!!`);
  });
};

start();
