import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";

const Button = ({ children, onClick, className = '', disabled = false, variant = 'default', size = 'default' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition duration-200';
 
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// Main Navigation Component
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm ">
      <div className="bg-white w-full flex justify-between items-center p-4">
        {/* Left Side - Logo */}
        <Link to="/" className="flex items-center">
  <svg width="180" height="60" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="100" fill="white" />
    <text
      x="90"
      y="65"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '48px',
        fill: '#1a1a2e',
        fontWeight: 'bold',
      }}
    >
      Quotely
    </text>
    <g>
      <circle cx="50" cy="50" r="30" fill="#ff6b35" />
      <text
        x="35"
        y="57"
        style={{
          fill: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        “”
      </text>
    </g>
  </svg>
</Link>

        {/* Center Navigation */}
        <div className="hidden md:flex space-x-4">
          {[
            { name: "Motivational Quotes", path: "/" }, // Changed to "/" for default
            { name: "Love Quotes", path: "/love-quotes" }, // Corrected path
            { name: "Life Quotes", path: "/life-quotes" }, // Corrected path
            { name: "Random Quote Generator", path: "/random" },
            { name: "AI Quote Generator", path: "/ai" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className=" text-gray-600 hover:text-primary transition-colors dark:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" className="hidden md:inline-flex">
            Today's Quotes
          </Button>
          <Button className="hidden md:inline-flex">
            Make Quote
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </Button>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="bg-gray-100 dark:bg-gray-800 py-2">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {[
            { name: 'All Religion', path: "/all-religion" },
            // { name: 'Trending', path: "/trending" },
            { name: 'Inspiration', path: "/ins-quotes" },
            { name: 'Friendship', path: "/friendship" },
            { name: 'Humour', path: "/humor" },
            { name: 'Swami-vivekananda', path: "/swami-vivekananda" },
            { name: 'Alone Quotes', path: "/alone" },
            { name: 'Travel', path: "/travel" },
            { name: 'Love', path: "/love-quotes" },
            { name: 'Nature', path: "/nature-quotes" },
            { name: 'Life', path: "/life-quotes" },
            { name: 'Family', path: "/family" },
            { name: 'God Quotes', path: "/god-quotes" },
            { name: 'Success quotes', path: "/success" },
          ].map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-sm md:text-base lg:text-lg text-gray-600 hover:text-primary transition-colors dark:text-gray-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;