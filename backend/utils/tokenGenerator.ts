import jwt from 'jsonwebtoken';

const accessToken = (payload: object) =>
  jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '1d',
    algorithm: 'HS256'
  });

const refreshToken = (payload: object) =>
  jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: '30d',
    algorithm: 'HS256'
  });

export default { accessToken, refreshToken };
