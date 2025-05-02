import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname helper (if needed)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin SDK
admin.initializeApp({
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Health-check route
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware to validate Firebase ID Token
async function authenticate(
  req: Request & { uid?: string },
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// TODO: Add capsule routes using `authenticate` middleware
// e.g.
// import capsuleRoutes from './routes/capsules.js';
// app.use('/capsules', authenticate, capsuleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
