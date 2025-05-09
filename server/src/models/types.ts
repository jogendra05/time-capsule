import { Timestamp } from "firebase-admin/firestore";

export interface UserProfile {
  uid: string;                   // Firebase auth UID
  displayName: string;
  email: string;
  photoURL?: string;             // user’s avatar
  createdAt: Timestamp;          // when the profile was first made
}

export interface Capsule {
  id?: string;                   // Firestore doc ID
  ownerId: string;               // UID of the creator
  title: string;
  description: string;
  imageUrl: string;
  openDate: Timestamp;           // when the capsule “unlocks”
  createdAt: Timestamp;
  sharedWith: string[];          // array of UIDs or emails
  privacy?: 'private' | 'shared';// add granularity beyond sharedWith
}
