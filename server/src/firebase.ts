import admin from 'firebase-admin'; 
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let serviceAccount;
const envVar = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!envVar) throw new Error('FIREBASE_SERVICE_ACCOUNT is not set');

try {
  // if you’ve inlined the JSON into the env var:
  serviceAccount = JSON.parse(envVar);
} catch {
  // otherwise treat it as a path:
  const filePath = path.resolve(envVar);
  serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const auth = admin.auth();
export const db   = admin.firestore();
