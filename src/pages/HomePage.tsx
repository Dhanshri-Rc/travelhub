import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, TrendingUp, Shield, AlertTriangle, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchFeaturedDestinations } from '../store/destinationSlice';
import SearchBar from '../components/common/SearchBar';
import DestinationCard from '../components/common/DestinationCard';

const testimonials = [
  { id: '1', name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'Amazing platform! Found the perfect hotel and guide for my solo trip. The safety features gave me real confidence.' },
  { id: '2', name: 'Mike Chen',     avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'Best travel booking platform I have used. Easy to navigate, great prices, and love the verified safety ratings.' },
  { id: '3', name: 'Emma Rodriguez', avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5, comment: 'Booked everything for my vacation in one place. The women-friendly filters helped me choose safe options.' },
];

const stats = [
  { label: 'Hotels Booked',   value: '50K+', icon: MapPin },
  { label: 'Happy Travelers', value: '25K+', icon: Users },
  { label: 'Cities Covered',  value: '100+', icon: TrendingUp },
  { label: 'Safety Verified', value: '95%',  icon: Shield },
];

const safetyFeatures = [
  { icon: Shield,        title: 'Safety Verified',  description: 'All partners are safety verified with background checks and regular audits.' },
  { icon: Users,         title: 'Women Friendly',   description: 'Special focus on women-friendly accommodations and services for safe travel.' },
  { icon: AlertTriangle, title: '24/7 Support',     description: 'Round-the-clock emergency support and assistance for all travelers.' },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { featuredHotels, featuredRestaurants, featuredAttractions, loading } = useAppSelector((s) => s.destinations);

  useEffect(() => {
    dispatch(fetchFeaturedDestinations());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ── Hero ── */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-2">
              <Shield className="h-4 w-4 text-pink-300" />
              <span>Safety-First Travel Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Your Next<br />
              <span className="text-accent-300">Safe Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Book hotels, restaurants, attractions, rides, and guides with confidence. Your safety is our priority.
            </p>
            <div className="pt-6">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety Features ── */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Safety, Our Priority</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Travel with confidence knowing all our services are safety-verified and women-friendly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyFeatures.map((f, i) => (
              <div key={i} className="text-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="bg-pink-100 dark:bg-pink-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <f.icon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Hotels ── */}
      <FeaturedSection
        title="Featured Safe Hotels"
        subtitle="Discover our handpicked selection of safety-verified accommodations"
        items={featuredHotels}
        loading={loading}
        linkTo="/hotels"
        linkLabel="View All Hotels"
        linkClass="bg-primary-500 hover:bg-primary-600"
        bg="bg-gray-50 dark:bg-gray-900"
      />

      {/* ── Featured Restaurants ── */}
      <FeaturedSection
        title="Safe Dining Experiences"
        subtitle="Savor delicious cuisines at verified, women-friendly dining establishments"
        items={featuredRestaurants}
        loading={loading}
        linkTo="/restaurants"
        linkLabel="View All Restaurants"
        linkClass="bg-secondary-500 hover:bg-secondary-600"
        bg="bg-white dark:bg-gray-800"
      />

      {/* ── Featured Attractions ── */}
      <FeaturedSection
        title="Safe Tourist Attractions"
        subtitle="Explore the city's most iconic landmarks with verified safety standards"
        items={featuredAttractions}
        loading={loading}
        linkTo="/attractions"
        linkLabel="View All Attractions"
        linkClass="bg-accent-500 hover:bg-accent-600"
        bg="bg-gray-50 dark:bg-gray-900"
      />

      {/* ── Emergency Contacts ── */}
      <section className="py-16 bg-red-50 dark:bg-red-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Emergency Contacts</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Keep these important numbers handy during your travels</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, label: 'Police',          number: '100',  color: 'red' },
              { icon: Users,  label: 'Women Helpline',  number: '1091', color: 'pink' },
              { icon: MapPin, label: 'Tourist Helpline', number: '1363', color: 'blue' },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <item.icon className={`h-8 w-8 text-${item.color}-500 mx-auto mb-3`} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.label}</h3>
                <a href={`tel:${item.number}`} className={`text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.number}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Travelers Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Read reviews from satisfied customers about their safe travel experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{t.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Safe Journey?</h2>
          <p className="text-xl text-primary-100 mb-8">Join thousands of travelers who trust TravelHub for their adventures</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </Link>
            <Link to="/destinations" className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center gap-2">
              Explore Destinations <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Reusable Featured Section ──────────────────────────────────────────────────
function FeaturedSection({
  title, subtitle, items, loading, linkTo, linkLabel, linkClass, bg,
}: {
  title: string; subtitle: string; items: any[]; loading: boolean;
  linkTo: string; linkLabel: string; linkClass: string; bg: string;
}) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No destinations available. Make sure the backend is running and seeded.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {items.map((item) => <DestinationCard key={item._id} destination={item} />)}
          </div>
        )}

        <div className="text-center">
          <Link to={linkTo} className={`inline-flex items-center gap-2 px-6 py-3 ${linkClass} text-white rounded-xl font-medium transition-colors`}>
            {linkLabel} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
