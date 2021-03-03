import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

const { JWT_SECRET } = process.env;

export const encryptPassword = async (password) => {
  const hashed = await hash(password, 10);
  return hashed;
};

export const decryptPassword = async (password, hashed) => {
  const isValid = await compare(password, hashed);
  return isValid;
};

export const signToken = (data) => {
  const token = sign(data, JWT_SECRET, { expiresIn: '8h' });
  return token;
};

export const verifyToken = (token) => {
  const data = verify(token, JWT_SECRET);
  return data;
};
