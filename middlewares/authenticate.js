import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    throw new UnauthorizedError('Authentication failed');
  }
};

export default authenticateUser;
