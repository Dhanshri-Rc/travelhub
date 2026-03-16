import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TravelHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate travel companion for discovering amazing destinations, 
              booking accommodations, and creating unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/hotels" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Hotels
              </Link>
              <Link to="/restaurants" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Restaurants
              </Link>
              <Link to="/attractions" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Attractions
              </Link>
              <Link to="/rides" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Vehicle Rides
              </Link>
              <Link to="/guides" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Tour Guides
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Cancellation Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">support@travelhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Travel Street<br />
                  Adventure City, AC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TravelHub. All rights reserved. Made with ❤️ for travelers.
          </p>
        </div>
      </div>
    </footer>
  );
}