import React from 'react';
import { Shield, Star, DollarSign } from 'lucide-react';

interface Props {
  womenFriendly: boolean;
  onWomenFriendlyChange: (v: boolean) => void;
  minRating: number;
  onMinRatingChange: (v: number) => void;
  priceRange: [number, number];
  onPriceRangeChange: (v: [number, number]) => void;
}

export default function FilterSidebar({ womenFriendly, onWomenFriendlyChange, minRating, onMinRatingChange, priceRange, onPriceRangeChange }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 space-y-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>

      {/* Women Friendly */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${womenFriendly ? 'bg-pink-500' : 'bg-gray-200 dark:bg-gray-600'}`}
            onClick={() => onWomenFriendlyChange(!womenFriendly)}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${womenFriendly ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Shield className="h-4 w-4 text-pink-500" /> Women Friendly Only
          </span>
        </label>
      </div>

      {/* Min Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" /> Minimum Rating: {minRating}+
        </label>
        <input type="range" min="0" max="5" step="0.5" value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
          className="w-full accent-primary-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Any</span><span>5★</span>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-green-500" /> Price Range
        </label>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={priceRange[0] || ''}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
          />
          <input type="number" placeholder="Max" value={priceRange[1] || ''}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
