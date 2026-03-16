/**
 * Database Seeder
 * Populates MongoDB with sample destination data
 * Run: node config/seed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Destination = require('../models/Destination');

const destinations = [
  {
    title: 'Grand Plaza Hotel',
    location: 'Downtown City Center',
    description: 'Luxurious hotel in the heart of the city with world-class amenities and exceptional service.',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 299,
    rating: 4.8,
    category: 'hotel',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant'],
    safetyRating: 4.9,
    womenFriendly: true,
  },
  {
    title: 'Ocean View Resort',
    location: 'Beachfront District',
    description: 'Stunning beachfront resort with panoramic ocean views and premium facilities.',
    image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 449,
    rating: 4.6,
    category: 'hotel',
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar', 'Spa'],
    safetyRating: 4.7,
    womenFriendly: true,
  },
  {
    title: 'City Boutique Hotel',
    location: 'Arts Quarter',
    description: 'Modern boutique hotel with contemporary design and personalized service.',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 199,
    rating: 4.4,
    category: 'hotel',
    amenities: ['Free WiFi', 'Gym', 'Business Center', 'Concierge'],
    safetyRating: 4.5,
    womenFriendly: true,
  },
  {
    title: 'La Belle Cuisine',
    location: 'French Quarter',
    description: 'Authentic French cuisine in an elegant atmosphere with award-winning chefs.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 85,
    rating: 4.9,
    category: 'restaurant',
    amenities: ['Fine Dining', 'Wine Selection', 'Romantic Ambiance', 'Private Dining'],
    safetyRating: 4.8,
    womenFriendly: true,
  },
  {
    title: 'Sakura Sushi Bar',
    location: 'Little Tokyo',
    description: 'Fresh sushi and traditional Japanese dishes in a modern setting.',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 55,
    rating: 4.7,
    category: 'restaurant',
    amenities: ['Sushi Bar', 'Fresh Fish', 'Sake Selection', "Chef's Table"],
    safetyRating: 4.6,
    womenFriendly: true,
  },
  {
    title: 'City Art Museum',
    location: 'Museum District',
    description: 'World-class art collection featuring contemporary and classical masterpieces.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 25,
    rating: 4.6,
    category: 'attraction',
    amenities: ['Guided Tours', 'Gift Shop', 'Cafe', 'Accessibility'],
    safetyRating: 4.8,
    womenFriendly: true,
  },
  {
    title: 'Historic Castle',
    location: 'Old Town',
    description: 'Medieval castle with stunning architecture and rich historical significance.',
    image: 'https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 35,
    rating: 4.8,
    category: 'attraction',
    amenities: ['Guided Tours', 'Audio Guide', 'Photography Allowed', 'Souvenir Shop'],
    safetyRating: 4.6,
    womenFriendly: true,
  },
  {
    title: 'Adventure Park',
    location: 'Recreation District',
    description: 'Thrilling adventure park with zip lines, climbing walls, and outdoor activities.',
    image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 45,
    rating: 4.4,
    category: 'attraction',
    amenities: ['Safety Equipment', 'Trained Staff', 'Emergency Medical', 'Group Activities'],
    safetyRating: 4.5,
    womenFriendly: true,
  },
  {
    title: 'Luxury Mountain Retreat',
    location: 'Alpine Heights',
    description: 'Breathtaking mountain lodge with ski access and stunning views of the Alps.',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 599,
    rating: 4.9,
    category: 'hotel',
    amenities: ['Ski Access', 'Fireplace', 'Spa', 'Fine Dining', 'Helicopter Tours'],
    safetyRating: 4.8,
    womenFriendly: true,
  },
  {
    title: 'Tropical Beach Paradise',
    location: 'Maldives Islands',
    description: 'Overwater bungalows surrounded by crystal clear turquoise waters.',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 899,
    rating: 5.0,
    category: 'hotel',
    amenities: ['Private Beach', 'Snorkeling', 'Scuba Diving', 'Water Sports', 'All Inclusive'],
    safetyRating: 4.9,
    womenFriendly: true,
  },
  {
    title: 'Rooftop Bar & Grill',
    location: 'Sky District',
    description: 'Panoramic city views paired with exquisite cocktails and international cuisine.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 65,
    rating: 4.5,
    category: 'restaurant',
    amenities: ['Rooftop Views', 'Cocktail Bar', 'Live Music', 'Private Events'],
    safetyRating: 4.7,
    womenFriendly: true,
  },
  {
    title: 'Ancient Temple Complex',
    location: 'Heritage Quarter',
    description: 'A UNESCO World Heritage site with thousands of years of history.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 20,
    rating: 4.7,
    category: 'attraction',
    amenities: ['Guided Tours', 'Audio Guide', 'Photography Allowed', 'Cultural Shows'],
    safetyRating: 4.5,
    womenFriendly: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert new destinations
    await Destination.insertMany(destinations);
    console.log(`✅ Successfully seeded ${destinations.length} destinations`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
