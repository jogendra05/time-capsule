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

export async function listCapsules(
  req: AuthRequest, res: Response, next: NextFunction
) {
  try {
    const snap = await db.collection(COLL)
      .where('ownerUid', '==', req.uid)
      .orderBy('createdAt', 'desc')
      .get();
    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getCapsule(
  req: AuthRequest, res: Response, next: NextFunction
) {
  try {
    const docRef = db.collection(COLL).doc(req.params.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) throw new ApiError(404, 'Capsule not found');
    const data = docSnap.data()!;
    // Only owner or participant can view
    if (data.ownerUid !== req.uid && !data.participants.includes(req.uid)) {
      throw new ApiError(403, 'Forbidden');
    }
    res.json({ id: docSnap.id, ...data });
  } catch (err) {
    next(err);
  }
}
