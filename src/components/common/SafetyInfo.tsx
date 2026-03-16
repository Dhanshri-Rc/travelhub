import React from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';

interface SafetyInfoProps {
  safetyFeatures: string[];
  safetyRating: number;
  className?: string;
}

export default function SafetyInfo({ safetyFeatures, safetyRating, className = '' }: SafetyInfoProps) {
  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield },
    { name: 'Women Helpline', number: '1091', icon: Phone },
    { name: 'Tourist Helpline', number: '1363', icon: MapPin },
  ];

  return (
    <div className={`bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-5 w-5 text-pink-600 dark:text-pink-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Safety Information</h3>
      </div>

      {/* Safety Rating */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Safety Rating</span>
          <span className="text-lg font-bold text-pink-600 dark:text-pink-400">{safetyRating}/5.0</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(safetyRating / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Safety Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Emergency Contacts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-1">
                <contact.icon className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{contact.name}</span>
              </div>
              <a 
                href={`tel:${contact.number}`}
                className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Safety Tips</h5>
            <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Share your location with trusted contacts</li>
              <li>• Keep emergency numbers handy</li>
              <li>• Trust your instincts and stay alert</li>
              <li>• Use verified and well-reviewed services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}