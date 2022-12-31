import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorsRoute.js';

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

const connect = () => {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use(logger('dev'));

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
