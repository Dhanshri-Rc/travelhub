import React from 'react';
import { Shield, ShieldCheck, Users, AlertTriangle } from 'lucide-react';

interface SafetyBadgeProps {
  safetyRating: number;
  womenFriendly: boolean;
  verified?: boolean;
  className?: string;
}

export default function SafetyBadge({ safetyRating, womenFriendly, verified, className = '' }: SafetyBadgeProps) {
  const getSafetyColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (rating >= 4.0) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Safety Rating */}
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(safetyRating)}`}>
        <Shield className="h-3 w-3" />
        <span>{safetyRating}</span>
      </div>

      {/* Women Friendly Badge */}
      {womenFriendly && (
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
          <Users className="h-3 w-3" />
          <span>Women Friendly</span>
        </div>
      )}

      {/* Verified Badge */}
      {verified && (
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <ShieldCheck className="h-3 w-3" />
          <span>Verified</span>
        </div>
      )}
    </div>
  );
}