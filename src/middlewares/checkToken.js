/* eslint-disable no-unused-expressions */
import errorResponse from '../helpers/errorResponse';
import { findUser } from '../services/userService';
import { verifyToken } from '../utils/auth';

export default async (req, res, next) => {
  try {
    const token = req.headers.auth.split(' ')[1];
    !token && errorResponse(res, 500, 'No token provided or incomplete token');
    const info = verifyToken(token);
    !info && errorResponse(res, 401, 'Invalid or expired token');
    const { id } = info;

    const user = await findUser({ id });

    !user && errorResponse(res, 401, 'User not found ');

    req.user = user;

    return next();
  } catch (error) {
    return errorResponse(res, 401, 'Not authorized, check your token');
  }
};
