import asyncHandeler from 'express-async-handler';
import errorResponse from '../helpers/errorResponse';
import successResponse from '../helpers/successResponse';
import {
  createUser,
  findUser,
  findUsers,
  deleteOne,
  updateUser,
} from '../services/userService';
import {
  decryptPassword,
  encryptPassword,
  signToken,
  verifyToken,
} from '../utils/auth';
import sendEmail from '../utils/mail';

export const register = asyncHandeler(async (req, res) => {
  const existing = await findUser({ email: req.body.email });
  if (existing) return errorResponse(res, 400, 'User already exists');
  const password = await encryptPassword(req.body.password);
  const user = await createUser({ ...req.body, password, role: 'user' });
  await sendEmail('verify', {
    name: user.firstName,
    email: user.email,
    id: user.id,
  });
  return successResponse(res, 201, 'User registered Successfully', user);
});

export const verifyAccount = asyncHandeler(async (req, res) => {
  const { id } = req.params;
  const user = await findUser({ id });
  if (!user) return errorResponse(res, 404, 'User not found');
  await updateUser({ comfirmed: true }, { id });
  await sendEmail('comfirmation', {
    name: user.firstName,
    email: user.email,
    id,
  });
  return successResponse(res, 200, 'Successfully verfied your Email.');
});

export const getUsers = asyncHandeler(async (req, res) => {
  const users = await findUsers();
  return successResponse(res, 200, 'Successfully Fetched all Users', users);
});

export const signin = asyncHandeler(async (req, res) => {
  const user = await findUser({ email: req.body.email });
  if (!user) return errorResponse(res, 404, 'User not found');
  const isReal = await decryptPassword(req.body.password, user.password);

  if (!isReal) return errorResponse(res, 404, 'Email or Password is incorect');

  const token = signToken({ id: user.id, email: user.email });

  return successResponse(res, 200, 'Signed in successfully', { token, user });
});

export const Oauth = asyncHandeler(async (req, res) => {
  const { user } = req;
  const token = signToken({ id: user.id, email: user.email });

  return successResponse(res, 200, 'Signed in successfully', { token, user });
});

export const getUser = asyncHandeler(async (req, res) => {
  const user = await findUser({ id: req.params.id });
  if (!user) return errorResponse(res, 404, 'User not found');
  return successResponse(res, 200, 'Successfully Fetched  User', user);
});

export const updateUserData = asyncHandeler(async (req, res) => {
  const user = await findUser({ id: req.params.id });
  if (!user) return errorResponse(res, 404, 'User not found');
  const updatedUser = await updateUser({ ...req.body }, { id: req.params.id });
  return successResponse(res, 200, 'Successfully Updated User', updatedUser);
});

export const deleteUser = asyncHandeler(async (req, res) => {
  const user = await findUser({ id: req.params.id });
  if (!user) return errorResponse(res, 404, 'User not found');

  const data = await deleteOne({ id: req.params.id });
  return successResponse(res, 200, 'Successfully Deleted User', data);
});

export const getUserProfile = asyncHandeler(async (req, res) => {
  const { email, firstName, lastName } = req.user;
  const profile = {
    firstName,
    lastName,
    email,
  };
  successResponse(res, 200, 'Successfully Fetched  User Profile', profile);
});

export const updateUserProfile = asyncHandeler(async (req, res) => {
  if (req.body.email) {
    const check = await findUser({ email: req.body.email });
    if (check) {
      return errorResponse(res, 409, 'That email is alredy registered');
    }
  }
  const updated = await updateUser(
    { ...req.body, password: req.user.password },
    { id: req.user.id },
  );
  return successResponse(
    res,
    200,
    'Successfully Updated User Profile',
    updated,
  );
});

export const changePassword = asyncHandeler(async (req, res) => {
  const checkMatch = await decryptPassword(
    req.body.oldPassword,
    req.user.password,
  );
  if (!checkMatch) return errorResponse(res, 401, 'Incorect password');
  const newPassword = await encryptPassword(req.body.newPassword);
  const updated = await updateUser(
    { password: newPassword },
    { id: req.user.id },
  );
  return successResponse(
    res,
    200,
    'Successfully Updated User Password',
    updated,
  );
});

export const deleteUserProfile = asyncHandeler(async (req, res) => {
  const data = await deleteOne({ id: req.user.id });
  return successResponse(res, 200, 'Successfully Deleted User', data);
});

export const forgotPassword = asyncHandeler(async (req, res) => {
  const { HOST } = process.env;
  const user = await findUser({ email: req.body.email });
  if (!user) return errorResponse(res, 404, 'User Not found');
  const token = signToken({ email: user.email, id: user.id });

  await sendEmail('forgotPassword', {
    email: user.email,
    id: user.id,
    token,
  });
  return successResponse(
    res,
    200,
    'check your email',
    `${HOST}/api/users/reset/${token}`,
  );
});

export const resetPassword = asyncHandeler(async (req, res) => {
  const { token } = req.params;
  if (!token) return errorResponse(res, 401, 'No token provided ');
  const userData = verifyToken(token);
  if (!userData) return errorResponse(res, 401, 'Invalid or incomplete token');

  const user = await findUser({ email: userData.email });
  if (!user) return errorResponse(res, 404, ' Not allowed to do this ');
  const newPassword = await encryptPassword(req.body.newPassword);

  const updatedUser = await updateUser(
    { password: newPassword },
    { id: user.id },
  );
  return successResponse(res, 200, 'Password  reset Successfully', updatedUser);
});

export const makeCreator = asyncHandeler(async (req, res) => {
  const user = await findUser({ id: req.params.id });
  if (!user) return errorResponse(res, 404, 'User with that id not found');
  if (user.role === 'creator') {
    return errorResponse(res, 400, 'User already a creator');
  }
  const newRole = await updateUser({ role: 'creator' }, { id: user.id });
  await sendEmail('creator', {
    email: user.email,
    name: user.firstName,
  });
  return successResponse(res, 200, 'Successfully made a creator', newRole);
});

export const makeUser = asyncHandeler(async (req, res) => {
  const user = await findUser({ id: req.params.id });
  if (!user) return errorResponse(res, 404, 'User with that id not found');
  if (user.role === 'user') {
    return errorResponse(res, 400, 'User already a Normal user');
  }
  const newRole = await updateUser({ role: 'user' }, { id: user.id });
  await sendEmail('normalUser', {
    email: user.email,
    name: user.firstName,
  });
  return successResponse(res, 200, 'Successfully made a normal User', newRole);
});
