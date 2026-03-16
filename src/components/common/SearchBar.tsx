import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchDestinations, setFilters } from '../../store/destinationSlice';

export default function SearchBar() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();

  const [destination,       setDestinationInput] = useState('');
  const [selectedCategory,  setSelectedCategory]  = useState('all');
  const [checkIn,           setCheckIn]           = useState('');
  const [checkOut,          setCheckOut]          = useState('');

  const categories = [
    { value: 'all',        label: 'All Categories' },
    { value: 'hotel',      label: 'Hotels' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'attraction', label: 'Attractions' },
    { value: 'ride',       label: 'Rides' },
    { value: 'guide',      label: 'Guides' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ category: selectedCategory, search: destination }));
    const path = selectedCategory === 'all' ? '/destinations' : `/${selectedCategory}s`;
    navigate(path + (destination ? `?search=${encodeURIComponent(destination)}` : ''));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Where to?" value={destination}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm transition-all">
              {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search hotels, restaurants, attractions..."
            value={destination} onChange={(e) => setDestinationInput(e.target.value)}
            className="w-full pl-12 pr-36 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white transition-all"
          />
          <button type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
