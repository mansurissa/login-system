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
    const users = await User.findAll();
    successRes(res, 200, 'Successfully got All users', users);
  } catch (error) {
    errorRes(res, 500, 'Ther was error while fetching users');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findAll({
      where: {
        email: email,
      },
    });
    if (foundUser.length < 1) {
      errorRes(res, 500, 'User not found');
    } else {
      await bcrypt.compare(password, foundUser[0].password, (err, result) => {
        if (err) {
          errorRes(res, 500, 'password is wrong');
        }
        if (result) {
          const token = jwt.sign(
            {
              email: foundUser[0].email,
              id: foundUser[0].id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '2h',
            },
          );
          successRes(res, 200, 'Logged in successfully', {
            token,
            user: foundUser[0],
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    errorRes(res, 500, 'There was problem while logging in');
  }
};
