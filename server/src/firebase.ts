import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const auth = admin.auth();
export const db = admin.firestore();