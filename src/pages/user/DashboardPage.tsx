import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, Clock, Star, User, Bell, Edit3, CheckCircle, XCircle, LayoutDashboard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProfile, updateProfile, fetchBookings, cancelBooking } from '../../store/userSlice';
import { Booking, BookingCategory } from '../../types';

type Tab = 'bookings' | 'profile' | 'settings';

const categoryMap: Record<BookingCategory, string> = {
  all: '', hotels: 'hotel', restaurants: 'restaurant', attractions: 'attraction', rides: 'ride', guides: 'guide',
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { token, user: authUser } = useAppSelector((s) => s.auth);
  const { profile, bookings, loadingProfile, loadingBookings, updatingProfile, error } = useAppSelector((s) => s.user);

  const [activeTab,        setActiveTab]        = useState<Tab>('bookings');
  const [selectedCategory, setSelectedCategory] = useState<BookingCategory>('all');
  const [profileForm,      setProfileForm]      = useState({ name: '', phone: '', location: '' });
  const [saveMsg,          setSaveMsg]          = useState('');

  // Load profile and bookings when component mounts
  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
      dispatch(fetchBookings(token));
    }
  }, [token, dispatch]);

  // Sync profile form when profile loads
  useEffect(() => {
    if (profile) {
      setProfileForm({ name: profile.name || '', phone: profile.phone || '', location: profile.location || '' });
    } else if (authUser) {
      setProfileForm({ name: authUser.name || '', phone: '', location: '' });
    }
  }, [profile, authUser]);

  const handleProfileSave = async () => {
    if (!token) return;
    const result = await dispatch(updateProfile({ token, payload: profileForm }));
    if (updateProfile.fulfilled.match(result)) {
      setSaveMsg('Profile updated successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!token || !window.confirm('Cancel this booking?')) return;
    dispatch(cancelBooking({ token, bookingId }));
  };

  const filteredBookings = selectedCategory === 'all'
    ? bookings
    : bookings.filter((b) => b.type === categoryMap[selectedCategory]);

  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const pending   = bookings.filter((b) => b.status === 'pending').length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const statusColor = (s: string) => ({
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    pending:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  }[s] ?? 'bg-gray-100 text-gray-700');

  const displayName = profile?.name || authUser?.name || 'Traveler';

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'bookings', label: 'My Bookings', icon: LayoutDashboard },
    { id: 'profile',  label: 'Profile',     icon: User },
    { id: 'settings', label: 'Settings',    icon: Bell },
  ];

  const categories: { value: BookingCategory; label: string }[] = [
    { value: 'all',          label: 'All Bookings' },
    { value: 'hotels',       label: 'Hotels' },
    { value: 'restaurants',  label: 'Restaurants' },
    { value: 'attractions',  label: 'Attractions' },
    { value: 'rides',        label: 'Rides' },
    { value: 'guides',       label: 'Guides' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {displayName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your bookings and account settings</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'primary' },
            { label: 'Confirmed',      value: confirmed,       icon: CheckCircle, color: 'green' },
            { label: 'Pending',        value: pending,         icon: Clock,       color: 'yellow' },
            { label: 'Total Spent',    value: `$${totalSpent}`, icon: DollarSign, color: 'secondary' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm flex items-center gap-4">
              <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/40 p-3 rounded-xl`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{loadingBookings ? '…' : stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6 pt-2">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-md mb-3">
                  <span className="text-white text-2xl font-bold">{displayName.charAt(0).toUpperCase()}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{displayName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profile?.email || authUser?.email}</p>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}>
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* ── Bookings Tab ── */}
            {activeTab === 'bookings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Bookings</h2>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as BookingCategory)}
                    className="text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                    {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                {loadingBookings ? (
                  <div className="flex justify-center py-12">
                    <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No bookings found</p>
                    <a href="/destinations" className="mt-3 inline-block text-primary-500 hover:underline text-sm">Browse destinations</a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredBookings.map((booking: Booking) => (
                      <div key={booking._id || booking.id}
                        className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">{booking.itemName?.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">{booking.itemName}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{booking.date}</span>
                              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />${booking.totalAmount}</span>
                              <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{booking.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          {booking.status !== 'cancelled' && (
                            <button onClick={() => handleCancelBooking(booking._id || booking.id || '')}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Cancel booking">
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Profile Tab ── */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

                {saveMsg && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />{saveMsg}
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>
                )}

                {loadingProfile ? (
                  <div className="flex justify-center py-12">
                    <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-3xl font-bold">{displayName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{displayName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email || authUser?.email}</p>
                        <p className="text-xs text-gray-400 mt-1">Member since {new Date(profile?.createdAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'name',     label: 'Full Name',    type: 'text',  placeholder: 'Your name' },
                        { key: 'phone',    label: 'Phone Number', type: 'tel',   placeholder: '+1 (555) 000-0000' },
                        { key: 'location', label: 'Location',     type: 'text',  placeholder: 'City, Country' },
                      ].map(({ key, label, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                          <input type={type} value={(profileForm as any)[key]}
                            onChange={(e) => setProfileForm({ ...profileForm, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input type="email" value={profile?.email || authUser?.email || ''} disabled
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <button onClick={handleProfileSave} disabled={updatingProfile}
                      className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                      {updatingProfile ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Edit3 className="h-4 w-4" />}
                      {updatingProfile ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── Settings Tab ── */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h2>

                {/* Notification toggles */}
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive booking confirmations and updates', defaultOn: true },
                  { key: 'sms',   label: 'SMS Notifications',   desc: 'Get text message updates for your bookings', defaultOn: false },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultOn} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                    </label>
                  </div>
                ))}

                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-4">Danger Zone</h3>
                  <button className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
