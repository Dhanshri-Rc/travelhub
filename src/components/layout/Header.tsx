import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Moon, Sun, Menu, X, LogOut, Shield, LayoutDashboard } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { toggleDarkMode } from '../../store';
import { logout } from '../../store/authSlice';
import { resetUserState } from '../../store/userSlice';

export default function Header() {
  const dispatch    = useAppDispatch();
  const navigate    = useNavigate();
  const location    = useLocation();
  const darkMode    = useAppSelector((s) => s.ui.darkMode);
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [isMenuOpen,     setIsMenuOpen]     = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUserState());
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home',        path: '/' },
    { name: 'Hotels',      path: '/hotels' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Attractions', path: '/attractions' },
    { name: 'Rides',       path: '/rides' },
    { name: 'Guides',      path: '/guides' },
    { name: 'About',       path: '/about' },
    { name: 'Contact',     path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-500 p-2 rounded-lg group-hover:bg-primary-600 transition-colors">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TravelHub</span>
            <div className="bg-pink-100 dark:bg-pink-900 px-2 py-1 rounded-full">
              <Shield className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative group ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
                {!isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Safe Travel Badge */}
            <div className="hidden sm:flex items-center space-x-1 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              <span className="text-xs font-medium text-pink-600 dark:text-pink-400">Safe Travel</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {user?.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 px-3 py-2 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="block px-3 py-2 text-sm text-red-600 dark:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
