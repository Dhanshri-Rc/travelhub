import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Shield, X, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchDestinations, setFilters } from '../store/destinationSlice';
import DestinationCard from '../components/common/DestinationCard';

interface Props { defaultCategory?: string; }

const categories = [
  { value: 'all',         label: 'All' },
  { value: 'hotel',       label: 'Hotels' },
  { value: 'restaurant',  label: 'Restaurants' },
  { value: 'attraction',  label: 'Attractions' },
  { value: 'ride',        label: 'Rides' },
  { value: 'guide',       label: 'Guides' },
];

const sortOptions = [
  { value: '',            label: 'Default' },
  { value: 'price_asc',   label: 'Price: Low to High' },
  { value: 'price_desc',  label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
];

export default function DestinationsPage({ defaultCategory }: Props) {
  const dispatch = useAppDispatch();
  const { destinations, loading, error, filters } = useAppSelector((s) => s.destinations);

  const [search,        setSearch]        = useState('');
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'all');
  const [womenFriendly, setWomenFriendly] = useState(false);
  const [sort,          setSort]          = useState('');
  const [showFilters,   setShowFilters]   = useState(false);
  const [minPrice,      setMinPrice]      = useState('');
  const [maxPrice,      setMaxPrice]      = useState('');

  // Fetch whenever filters change
  useEffect(() => {
    setActiveCategory(defaultCategory || 'all');
  }, [defaultCategory]);

  useEffect(() => {
    const params = {
      category:     activeCategory,
      search:       search || undefined,
      womenFriendly: womenFriendly || undefined,
      minPrice:     minPrice ? Number(minPrice) : undefined,
      maxPrice:     maxPrice ? Number(maxPrice) : undefined,
      sort:         sort || undefined,
    };
    dispatch(fetchDestinations(params as any));
  }, [activeCategory, womenFriendly, sort, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchDestinations({ category: activeCategory, search, womenFriendly, minPrice: minPrice ? Number(minPrice) : null, maxPrice: maxPrice ? Number(maxPrice) : null, sort } as any));
  };

  const pageTitle: Record<string, string> = {
    hotel: 'Hotels', restaurant: 'Restaurants', attraction: 'Attractions',
    ride: 'Rides & Transport', guide: 'Tour Guides', all: 'All Destinations',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3">{pageTitle[activeCategory] || 'Destinations'}</h1>
          <p className="text-primary-100 text-lg">Safety-verified destinations for worry-free travel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations, locations..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium transition-colors">
              Search
            </button>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Min Price ($)</label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Max Price ($)</label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sort By</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500">
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => setWomenFriendly(!womenFriendly)}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    womenFriendly
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                  }`}>
                  <Shield className="h-4 w-4" /> Women Friendly
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {loading ? 'Loading…' : `${destinations.length} result${destinations.length !== 1 ? 's' : ''} found`}
          </p>
          {womenFriendly && (
            <div className="flex items-center gap-1 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full">
              <Shield className="h-3 w-3" /> Women Friendly Filter Active
              <button onClick={() => setWomenFriendly(false)} className="ml-1 hover:text-pink-800">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Make sure the backend server is running at <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">http://localhost:5000</code></p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">No destinations found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => <DestinationCard key={dest._id} destination={dest} />)}
          </div>
        )}
      </div>
    </div>
  );
}
