import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Flame, 
  Smile, 
  Zap, 
  Cloud, 
  Moon, 
  Star, 
  Wind 
} from 'lucide-react';

const QuoteCategories = [
  {
    name: 'Love Quotes',
    icon: Heart,
    color: 'text-pink-500 dark:text-pink-400',
    bgGradient: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
    path: '/quotes/love'
  },
  {
    name: 'Motivational Quotes',
    icon: Flame,
    color: 'text-orange-500 dark:text-orange-400',
    bgGradient: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30',
    path: '/quotes/motivational'
  },
  {
    name: 'Happiness Quotes',
    icon: Smile,
    color: 'text-yellow-500 dark:text-yellow-400',
    bgGradient: 'from-yellow-100 to-lime-100 dark:from-yellow-900/30 dark:to-lime-900/30',
    path: '/quotes/happiness'
  },
  {
    name: 'Inspirational Quotes',
    icon: Zap,
    color: 'text-indigo-500 dark:text-indigo-400',
    bgGradient: 'from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30',
    path: '/quotes/inspirational'
  },
  {
    name: 'Spiritual Quotes',
    icon: Moon,
    color: 'text-purple-500 dark:text-purple-400',
    bgGradient: 'from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30',
    path: '/quotes/spiritual'
  },
  {
    name: 'Wisdom Quotes',
    icon: Star,
    color: 'text-emerald-500 dark:text-emerald-400',
    bgGradient: 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30',
    path: '/quotes/wisdom'
  },
  {
    name: 'Nature Quotes',
    icon: Wind,
    color: 'text-teal-500 dark:text-teal-400',
    bgGradient: 'from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30',
    path: '/quotes/nature'
  },
  {
    name: 'Life Quotes',
    icon: Cloud,
    color: 'text-blue-500 dark:text-blue-400',
    bgGradient: 'from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30',
    path: '/quotes/life'
  }
];

const QuoteCategoriesFooter = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Explore More Quote Categories
        </h2>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {QuoteCategories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="group relative flex flex-col items-center justify-center"
            >
              <div 
                className={`
                  w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center 
                  bg-gradient-to-br ${category.bgGradient}
                  shadow-md hover:shadow-xl transition-all duration-300 
                  transform group-hover:scale-110 group-hover:rotate-6
                `}
              >
                <category.icon 
                  className={`
                    w-10 h-10 md:w-12 md:h-12 
                    ${category.color} 
                    group-hover:scale-125 transition-transform duration-300
                  `}
                />
              </div>
              <p 
                className="
                  mt-2 text-xs md:text-sm text-center 
                  text-gray-700 dark:text-gray-300 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                "
              >
                {category.name}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Discover inspiration across various themes and emotions. 
            Click on a category to explore more quotes that resonate with you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default QuoteCategoriesFooter;