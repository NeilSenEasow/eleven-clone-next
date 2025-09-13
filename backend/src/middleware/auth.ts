import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      res.status(500).json({ message: 'JWT secret not configured' });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as { sub: string };
    const user = await User.findById(decoded.sub);

    if (!user) {
      res.status(401).json({ message: 'Invalid token - user not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(500).json({ message: 'Authentication error' });
  }
};

export const generateAccessToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const jwtAlgorithm = process.env.JWT_ALGORITHM || 'HS256';
  const expiresIn = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTES || '30');

  if (!jwtSecret) {
    throw new Error('JWT_SECRET_KEY environment variable is not defined');
  }

  return jwt.sign(
    { sub: userId },
    jwtSecret,
    { 
      algorithm: jwtAlgorithm as jwt.Algorithm,
      expiresIn: expiresIn * 60 // Convert minutes to seconds
    }
  );
};
