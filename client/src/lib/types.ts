export interface Capsule {
  id: string;
  title: string;
  description: string;
  unlockDate: Date;
  isLocked: boolean;
  mediaUrl?: string;
  isShared: boolean;
  createdAt: Date;
  createdBy: string;
}