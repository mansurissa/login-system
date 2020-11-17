import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Models from '../database/models';
import errorRes from '../helpers/errorHandler';
import successRes from '../helpers/successHandler';

const { User } = Models;

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error();
      } else {
        const user = await User.create({
          name,
          email,
          password: hash,
        });
        successRes(res, 201, 'User created successfully', user);
      }
    });
  } catch (error) {
    console.log(error);
    errorRes(res, 500, 'Ther was error while creating a user');
  }
};
export const getAll = async (req, res) => {
  try {
    const users = User.findAll();
    successRes(res, 200, 'Successfully got All users', users);
  } catch (error) {
    errorRes(res, 500, 'Ther was error while fetching users');
  }
};
