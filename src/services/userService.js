/* eslint-disable no-constant-condition */
import Models from '../database/models';

const { User } = Models;
export const createUser = async (user) => {
  const createduser = await User.create(user);
  return createduser;
};

export const findUser = async (param) => {
  const user = await User.findOne({ where: param });
  return user;
};
export const findUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const updateUser = async (user, param) => {
  const updatedUser = await User.update(user, {
    where: [param],
  });
  return updatedUser;
};
export const deleteOne = async (param) => {
  const user = await User.destroy({
    where: param,
  });
  return user;
};
