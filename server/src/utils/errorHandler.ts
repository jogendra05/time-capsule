import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError.js';

export default function errorHandler(
  err: any, req: Request, res: Response, next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}