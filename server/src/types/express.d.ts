import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      uid: string;  // Add authenticated user ID
      files?: Express.Multer.File[];  // Add Multer files
    }
  }
}