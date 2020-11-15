import Models from '../database/models';

const { User } = Models;

export const create = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAll = async (req, res) => {
  const users = User.findAll();
  res.status(200).json({
    message: 'Got all users successfully',
    users,
  });
};
