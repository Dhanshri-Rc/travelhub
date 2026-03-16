import React, { useState } from 'react';
import { Star, MapPin, Shield, Heart } from 'lucide-react';
import { Destination } from '../../types';
import BookingModal from './BookingModal';

interface Props { destination: Destination; }

export default function DestinationCard({ destination }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const { title, location, image, rating, price, originalPrice, amenities = [], description, safetyRating, womenFriendly, category } = destination;

  const categoryLabel = { hotel: 'Hotel', restaurant: 'Restaurant', attraction: 'Attraction', ride: 'Ride', guide: 'Guide' }[category] || category;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {categoryLabel}
          </div>

          {/* Discount badge */}
          {originalPrice && originalPrice > price && (
            <div className="absolute top-3 right-10 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
              Save ${originalPrice - price}
            </div>
          )}

          {/* Like button */}
          <button onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-gray-900/80 rounded-full hover:scale-110 transition-transform">
            <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </button>

          {/* Safety badge */}
          {safetyRating && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-full text-xs">
              <Shield className={`h-3 w-3 ${safetyRating >= 4.5 ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className="font-medium text-gray-800 dark:text-gray-200">{safetyRating}</span>
              {womenFriendly && <span className="text-pink-500 font-medium ml-1">♀ Safe</span>}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex flex-col flex-grow">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3.5 w-3.5" /><span className="line-clamp-1">{location}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{rating}</span>
              </div>
            </div>
          </div>

          {description && <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>}

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((a, i) => (
                <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs">{a}</span>
              ))}
              {amenities.length > 3 && <span className="text-xs text-gray-400 px-1 py-0.5">+{amenities.length - 3}</span>}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 mt-auto">
            <div className="flex items-baseline gap-1.5">
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
              )}
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">${price}</span>
              <span className="text-xs text-gray-500">/ night</span>
            </div>
            <button onClick={() => setShowModal(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showModal && <BookingModal destination={destination} onClose={() => setShowModal(false)} />}
    </>
  );
}
