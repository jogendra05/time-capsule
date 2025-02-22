import React from 'react';
import { Lock, Unlock, Calendar, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Capsule } from '../types';

interface CapsuleCardProps {
  capsule: Capsule;
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule }) => {
  const timeUntilUnlock = formatDistanceToNow(new Date(capsule.unlockDate), { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{capsule.title}</h3>
        <div className="flex items-center gap-2">
          {capsule.isShared && (
            <span className="text-blue-600">
              <Share2 className="w-4 h-4" />
            </span>
          )}
          {capsule.isLocked ? (
            <span className="text-amber-500">
              <Lock className="w-4 h-4" />
            </span>
          ) : (
            <span className="text-green-500">
              <Unlock className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{capsule.description}</p>

      {capsule.mediaUrl && (
        <div className="mb-4 relative h-32 rounded-lg overflow-hidden">
          <img
            src={capsule.mediaUrl}
            alt="Capsule preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>Unlocks {timeUntilUnlock}</span>
      </div>
    </div>
  );
};

export default CapsuleCard;