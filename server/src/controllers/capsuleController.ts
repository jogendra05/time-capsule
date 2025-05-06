import { Response, NextFunction } from 'express';
import { db } from '../firebase';
import ApiError from '../utils/ApiError';
import { AuthRequest } from '../middleware/auth';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

const COLL = 'capsules';

export async function createCapsule(
  req: AuthRequest, res: Response, next: NextFunction
) {
  try {
    const { title, description, openAt, imageUrls = [], participants = [] } = req.body;
    if (!title || !openAt) {
      throw new ApiError(400, '`title` and `openAt` are required');
    }
    const data = {
      ownerUid: req.uid,
      title,
      description: description || '',
      openAt: Timestamp.fromDate(new Date(openAt)),
      imageUrls,
      participants,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const ref = await db.collection(COLL).add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err) {
    next(err);
  }
}