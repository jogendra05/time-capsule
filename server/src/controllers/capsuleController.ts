import { Response, NextFunction } from 'express';
import fs from 'fs';
import { db } from '../firebase';
import ApiError from '../utils/ApiError';
import { AuthRequest } from '../middleware/auth';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { uploadImage } from '../config/cloudinary';

const COLL = 'capsules';

// helper to upload & cleanup
async function uploadAndCleanup(files: Express.Multer.File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const result = await uploadImage(file.path);
    urls.push(result.secure_url);
    fs.unlink(file.path, err => { if (err) console.warn('Cleanup failed:', err); });
  }
  return urls;
}

export async function createCapsule(
  req: AuthRequest & { files?: Express.Multer.File[] },
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description = '', openAt, participants = [] } = req.body;
    if (!title || !openAt) {
      throw new ApiError(400, '`title` and `openAt` are required');
    }

    // 1. Upload images
    const files = req.files ?? [];
    const imageUrls = await uploadAndCleanup(files);

    // 2. Build and save
    const data = {
      ownerUid:   req.uid,
      title,
      description,
      openAt:     Timestamp.fromDate(new Date(openAt)),
      imageUrls,
      participants: Array.isArray(participants)
                     ? participants
                     : JSON.parse(participants),
      createdAt:  FieldValue.serverTimestamp(),
      updatedAt:  FieldValue.serverTimestamp(),
      isOpened:   false,
      notifySent: false,
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
    if (data.ownerUid !== req.uid && !data.participants.includes(req.uid)) {
      throw new ApiError(403, 'Forbidden');
    }
    res.json({ id: docSnap.id, ...data });
  } catch (err) {
    next(err);
  }
}

export async function updateCapsule(
  req: AuthRequest & { files?: Express.Multer.File[] },
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description, openAt, participants } = req.body;
    const ref = db.collection(COLL).doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) throw new ApiError(404, 'Not found');
    const data = snap.data()!;
    if (data.ownerUid !== req.uid) throw new ApiError(403, 'Only owner can update');

    const updates: any = { updatedAt: FieldValue.serverTimestamp() };

    // 1. Handle new image uploads
    const files = req.files ?? [];
    if (files.length) {
      const newUrls = await uploadAndCleanup(files);
      updates.imageUrls = Array.isArray(data.imageUrls)
        ? [...data.imageUrls, ...newUrls]
        : newUrls;
    }

    // 2. Other fields
    if (title !== undefined)       updates.title = title;
    if (description !== undefined) updates.description = description;
    if (openAt !== undefined)      updates.openAt = Timestamp.fromDate(new Date(openAt));
    if (participants !== undefined) {
      updates.participants = Array.isArray(participants)
        ? participants
        : JSON.parse(participants);
    }

    await ref.update(updates);
    const updated = await ref.get();
    res.json({ id: updated.id, ...updated.data() });
  } catch (err) {
    next(err);
  }
}

export async function deleteCapsule(
  req: AuthRequest, res: Response, next: NextFunction
) {
  try {
    const ref = db.collection(COLL).doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) throw new ApiError(404, 'Not found');
    if (snap.data()!.ownerUid !== req.uid) throw new ApiError(403, 'Only owner can delete');
    await ref.delete();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
