import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandlerMiddleware from './middleware/ErrorMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const port = process.env.PORT || 5100;

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use(cookieParser());
app.use(errorHandlerMiddleware);

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}