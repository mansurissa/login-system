import asyncHandeler from 'express-async-handler';
import { config } from 'dotenv';
import sucessResponse from '../helpers/successResponse';

config();

export default asyncHandeler(async (req, res) => {
  sucessResponse(res, 200, `Welcome to  ${process.env.NAME}`);
});
