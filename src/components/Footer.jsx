import React from 'react';
import { Link } from 'react-router-dom';

import LoveImage from '../assets/images/love.jpg';
import friendshipQuotes from '../assets/images/friendship.jpg'
import InspirationalImage from '../assets/images/inspirational.jpg';
import NatureImage from '../assets/images/nature_q.jpg';
import LifeImage from '../assets/images/life.jpg';

const QuoteCategories = [
  {
    name: 'Love Quotes',
    image: LoveImage,
    path: '/love-quotes',
    gradient: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30'
  },
  {
    name: 'Friendship Quotes',
    image: friendshipQuotes,
    path: '/friendship',
    gradient: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30'
  },
  {
    name: 'Inspirational Quotes',
    image: InspirationalImage,
    path: '/ins-quotes',
    gradient: 'from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30'
  },
  {
    name: 'Nature Quotes',
    image: NatureImage,
    path: '/nature-quotes',
    gradient: 'from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30'
  },
  {
    name: 'Life Quotes',
    image: LifeImage,
    path: '/life-quotes',
    gradient: 'from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30'
  }
];

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 py-6 md:py-8 mt-8 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 text-indigo-600 dark:text-indigo-400">
          Explore More Quote Categories
        </h2>

        {/* Mobile view: Vertical list */}
        <div className="block md:hidden">
          <div className="flex flex-col space-y-3 items-center">
            {QuoteCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex items-center p-2">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet and desktop: Grid view */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {QuoteCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative block aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="absolute inset-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span
                    className="text-black text-sm font-semibold text-center bg-white/70 px-2 py-1 rounded group-hover:bg-white/80 transition-colors duration-300"
                    style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}
                  >
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;