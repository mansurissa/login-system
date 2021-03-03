import {
  registerValidator,
  signinValidator,
  changePasswordValidator,
  resetPasswordValidator,
} from '../validators/userValidator';
import errorResponse from '../helpers/errorResponse';

export const validateRegister = (req, res, next) => {
  const { error } = registerValidator.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      `Validation error: ${error.details[0].message.replace(/"/g, '')}`,
    );
  }
  return next();
};

export const validateSignin = (req, res, next) => {
  const { error } = signinValidator.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      `Validation error: ${error.details[0].message.replace(/"/g, '')}`,
    );
  }
  return next();
};
export const validatePassword = (req, res, next) => {
  const { error } = changePasswordValidator.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      `Validation error: ${error.details[0].message.replace(/"/g, '')}`,
    );
  }
  return next();
};
export const validateResetPassword = (req, res, next) => {
  const { error } = resetPasswordValidator.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      `Validation error: ${error.details[0].message.replace(/"/g, '')}`,
    );
  }
  return next();
};
