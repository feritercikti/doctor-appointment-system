import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/userRoute.js';

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
app.use('/api/users', userRoute);

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
