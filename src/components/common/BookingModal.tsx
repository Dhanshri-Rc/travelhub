import React, { useState } from 'react';
import { X, Calendar, Users, Shield, MapPin, Star, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { createBookingApi } from '../../api/userApi';
import { Destination } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props { destination: Destination; onClose: () => void; }

export default function BookingModal({ destination, onClose }: Props) {
  const dispatch   = useAppDispatch();
  const navigate   = useNavigate();
  const { token, isAuthenticated } = useAppSelector((s) => s.auth);

  const [date,    setDate]    = useState('');
  const [guests,  setGuests]  = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const total = destination.price * guests;

  const handleBook = async () => {
    if (!isAuthenticated || !token) {
      onClose();
      navigate('/login');
      return;
    }
    if (!date) { setError('Please select a date'); return; }
    setLoading(true); setError('');
    try {
      await createBookingApi(token, { destinationId: destination._id, date, guests });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Book Now</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your booking for <strong>{destination.title}</strong> has been placed successfully.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { onClose(); navigate('/dashboard'); }}
                className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                View Bookings
              </button>
              <button onClick={onClose} className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Destination Info */}
            <div className="flex gap-3">
              <img src={destination.image} alt={destination.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{destination.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />{destination.location}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{destination.rating}</span>
                  {destination.womenFriendly && (
                    <span className="flex items-center gap-1 text-xs text-pink-500 ml-2"><Shield className="h-3 w-3" />Women Friendly</span>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>
            )}

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="inline h-4 w-4 mr-1" />Date
              </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Users className="inline h-4 w-4 mr-1" />Guests
              </label>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm">
                {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>${destination.price} × {guests} guest{guests > 1 ? 's' : ''}</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2">
                <span>Total</span><span>${total}</span>
              </div>
            </div>

            <button onClick={handleBook} disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : !isAuthenticated ? 'Login to Book' : `Confirm Booking — $${total}`}
            </button>
            {!isAuthenticated && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">You need to be logged in to make a booking</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
