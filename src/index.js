import express, { urlencoded, json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/users';

config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/api/users', router);

app.listen(
  process.env.PORT,
  console.log(`Server started on:${process.env.PORT}`),
);
export default app;
