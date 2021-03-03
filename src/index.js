import '@babel/polyfill';
import express, { json } from 'express';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import { config } from 'dotenv';
import router from './routers/router';
import logger from './utils/logger';
import passportConfig from './configs/passport';

config();
const app = express();

passportConfig(passport);
logger.exceptions.handle();

app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(json());
app.use('/api', router);

const port = process.env.PORT;
app.listen(port, console.log(`Server started on port ${port}`));

export default app;
