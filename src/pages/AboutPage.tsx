import React from 'react';
import { Shield, Users, Globe, Award, Heart, MapPin, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Alexandra Rivera', role: 'CEO & Co-Founder', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200', bio: 'Former solo traveler turned safety advocate. Built TravelHub to empower every traveler.' },
  { name: 'James Chen',       role: 'CTO',              image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200', bio: 'Tech enthusiast passionate about using technology to make travel safer for everyone.' },
  { name: 'Sophie Laurent',   role: 'Head of Safety',   image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200', bio: '12 years of travel safety consulting. Reviews and verifies every partner on our platform.' },
];

const values = [
  { icon: Shield, title: 'Safety First',      desc: 'Every partner we list undergoes rigorous safety checks before being approved on our platform.', color: 'pink' },
  { icon: Heart,  title: 'Inclusive Travel',  desc: 'We believe travel should be accessible and safe for everyone, regardless of gender or background.', color: 'red' },
  { icon: Globe,  title: 'Global Reach',      desc: 'Covering destinations in over 100 cities worldwide, with local expertise in every market.', color: 'blue' },
  { icon: Award,  title: 'Quality Standards', desc: 'We maintain the highest standards for every hotel, restaurant, and guide on our platform.', color: 'yellow' },
];

const milestones = [
  { year: '2019', title: 'Founded',         desc: 'TravelHub was founded with a mission to make travel safer for women and solo travelers.' },
  { year: '2020', title: '10K Users',       desc: 'Reached 10,000 registered users despite global travel challenges.' },
  { year: '2021', title: '50 Cities',       desc: 'Expanded coverage to 50+ cities across 20 countries.' },
  { year: '2022', title: 'Safety Award',    desc: 'Won the Global Travel Safety Innovation Award.' },
  { year: '2023', title: '25K Travelers',   desc: 'Welcomed our 25,000th happy traveler to the TravelHub family.' },
  { year: '2024', title: '100+ Cities',     desc: 'Now operating in 100+ cities with 5,000+ verified partners.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" /> About TravelHub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Making Every Journey <span className="text-accent-300">Safe & Memorable</span></h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            We're on a mission to make travel accessible, safe, and empowering for everyone — especially solo travelers and women.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                TravelHub was born from a simple belief: <strong className="text-gray-900 dark:text-white">every person deserves to explore the world without fear.</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We meticulously vet every hotel, restaurant, attraction, and guide on our platform, applying safety standards that go far beyond industry norms. Our women-friendly verification program ensures travelers can identify accommodations and services that prioritize their safety and comfort.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From 24/7 support to real-time safety ratings, we're with you every step of your journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '25K+', label: 'Happy Travelers' },
                { value: '100+', label: 'Cities Covered' },
                { value: '5K+',  label: 'Verified Partners' },
                { value: '95%',  label: 'Safety Compliance' },
              ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide every decision we make at TravelHub</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
                <div className={`bg-${v.color}-100 dark:bg-${v.color}-900/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <v.icon className={`h-7 w-7 text-${v.color}-500`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">Milestones that shaped who we are today</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={i} className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? 'text-right pr-6' : 'text-left pl-6'}`}>
                    <div className="text-primary-600 dark:text-primary-400 font-bold text-lg">{m.year}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{m.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{m.desc}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 border-4 border-primary-500 rounded-full flex items-center justify-center shadow">
                    <CheckCircle className="h-4 w-4 text-primary-500" />
                  </div>
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
            <p className="text-gray-600 dark:text-gray-400">Passionate people dedicated to making your travels safer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary-100 dark:border-primary-900" />
                <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-primary-100 mb-8">Become part of a growing community of safe travelers around the world.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Get Started</Link>
            <Link to="/contact"  className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
