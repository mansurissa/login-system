import { Router } from 'express';
import '../configs/passport';
import passport from 'passport';
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  register,
  signin,
  updateUserData,
  updateUserProfile,
  deleteUserProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  makeCreator,
  verifyAccount,
  makeUser,
  Oauth,
} from '../controllers/userController';
import checkToken from '../middlewares/checkToken';
import { isAdmin } from '../middlewares/permisions';
import {
  validatePassword,
  validateRegister,
  validateResetPassword,
  validateSignin,
} from '../middlewares/userValidations';

const userRouter = Router();

userRouter.use(passport.initialize());

userRouter
  .route('/')
  .post(validateRegister, register)
  .get(checkToken, isAdmin, getUsers);
userRouter.route('/signin').post(validateSignin, signin);

userRouter.put('/verify/:id', verifyAccount);

userRouter
  .route('/profile')
  .get(checkToken, getUserProfile)
  .patch(checkToken, updateUserProfile)
  .delete(checkToken, deleteUserProfile);

userRouter
  .route('/profile/change-password')
  .patch(checkToken, validatePassword, changePassword);

userRouter.route('/forgotPassword').post(forgotPassword);
userRouter
  .route('/resetPassword/:token')
  .post(validateResetPassword, resetPassword);
userRouter.route('/makeCreator/:id').patch(checkToken, isAdmin, makeCreator);
userRouter.route('/makeUser/:id').patch(checkToken, isAdmin, makeUser);

userRouter
  .route('/:id')
  .get(checkToken, isAdmin, getUser)
  .patch(checkToken, isAdmin, updateUserData)
  .delete(checkToken, isAdmin, deleteUser);

userRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  Oauth,
);

export default userRouter;
