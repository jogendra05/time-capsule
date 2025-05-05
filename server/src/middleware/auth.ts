import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase';
import ApiError from '../utils/ApiError';

export interface AuthRequest extends Request {
  uid: string;
}

export async function authenticate(
  req: Request, res: Response, next: NextFunction
) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) throw new ApiError(401, 'Missing token');
    const idToken = header.split('Bearer ')[1];
    const decoded = await auth.verifyIdToken(idToken);
    (req as AuthRequest).uid = decoded.uid;
    next();
  } catch (err) {
    next(new ApiError(401, 'Unauthorized'));
  }
}
