import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      req.uid = decodedToken.uid;  // Set uid directly on Request
      next();
    })
    .catch(() => res.status(403).json({ error: 'Invalid token' }));
}