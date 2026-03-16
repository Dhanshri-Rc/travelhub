import React from 'react';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import SafetyBadge from './SafetyBadge';

interface CardProps {
  id: string;
  title: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  price?: number;
  originalPrice?: number;
  badge?: string;
  description?: string;
  features?: string[];
  safetyRating?: number;
  womenFriendly?: boolean;
  verified?: boolean;
  onClick: () => void;
  className?: string;
}

export default function Card({
  title,
  image,
  location,
  rating,
  reviews,
  price,
  originalPrice,
  badge,
  description,
  features = [],
  safetyRating,
  womenFriendly,
  verified,
  onClick,
  className = '',
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden ${className}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {badge}
          </div>
        )}
        {originalPrice && price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            Save ${originalPrice - price}
          </div>
        )}
        
        {/* Safety Badge Overlay */}
        {safetyRating && (
          <div className="absolute bottom-3 left-3">
            <SafetyBadge 
              safetyRating={safetyRating} 
              womenFriendly={womenFriendly || false}
              verified={verified}
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {rating}
              </span>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                ${price}
              </span>
              <span className="text-sm text-gray-500">/ night</span>
            </div>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}