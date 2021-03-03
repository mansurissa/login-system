import errorResponse from '../helpers/errorResponse';
import { findUser } from '../services/userService';

export const isAdmin = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await findUser({
    id: signedInUser.id,
  });
  if (user.role !== 'admin') {
    return errorResponse(res, 401, 'Only admin and  allowed ');
  }
  return next();
};

export const ownThePost = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await findUser({
    id: signedInUser.id,
  });
  if (user.role !== 'admin') {
    return errorResponse(res, 401, 'Only admin and  allowed ');
  }
  return next();
};
