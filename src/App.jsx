import React, { useState, useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copied, setCopied] = useState(null);

  const categories = ['All', 'Motivation', 'Love', 'Success', 'Life', 'Wisdom', 'Happiness'];

  const quotes = [
    {
      id: 1,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Motivation",
      likes: 342
    },
    {
      id: 2,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Success",
      likes: 526
    },
    {
      id: 3,
      text: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
      category: "Life",
      likes: 415
    },
    {
      id: 4,
      text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      author: "Martin Luther King Jr.",
      category: "Wisdom",
      likes: 289
    },
    {
      id: 5,
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      category: "Motivation",
      likes: 378
    },
    {
      id: 6,
      text: "Love is composed of a single soul inhabiting two bodies.",
      author: "Aristotle",
      category: "Love",
      likes: 412
    },
    {
      id: 7,
      text: "Happiness is not something ready-made. It comes from your own actions.",
      author: "Dalai Lama",
      category: "Happiness",
      likes: 356
    },
    {
      id: 8,
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      category: "Wisdom",
      likes: 298
    }
  ];

  const filteredQuotes = activeCategory === 'All' 
    ? quotes 
    : quotes.filter(quote => quote.category === activeCategory);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id.toString());
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    const chartDom = document.getElementById('popular-quotes-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: quotes.slice(0, 5).map(q => q.author.split(' ').pop() || q.author),
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: darkMode ? '#e0e0e0' : '#333'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: darkMode ? '#e0e0e0' : '#333'
          }
        }
      ],
      series: [
        {
          name: 'Likes',
          type: 'bar',
          barWidth: '60%',
          data: quotes.slice(0, 5).map(q => q.likes),
          itemStyle: {
            color: darkMode ? '#9c88ff' : '#6c5ce7'
          }
        }
      ],
      textStyle: {
        color: darkMode ? '#e0e0e0' : '#333'
      }
    };
    
    myChart.setOption(option);
    
    return () => {
      myChart.dispose();
    };
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold">
              <span >Quote</span>
              <span className="text-purple-600">ly</span>
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-3 rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 hover:text-purple-600 ${activeCategory === category ? (darkMode ? 'text-purple-400 font-semibold' : 'text-purple-600 font-semibold') : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 !rounded-button whitespace-nowrap"
            >
              <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600'} text-lg`}></i>
            </button>
            <button className="flex items-center space-x-2 py-2 px-4 bg-purple-600 text-white rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-purple-700">
              <i className="fas fa-user-circle"></i>
              <span className="hidden md:inline">Sign In</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20gradient%20background%20with%20soft%20purple%20and%20blue%20colors%2C%20modern%20minimalist%20design%20with%20subtle%20light%20particles%20floating%2C%20inspirational%20atmosphere%2C%20high%20quality%20digital%20art%2C%20perfect%20for%20quotes%20website%20background&width=1440&height=600&seq=hero-bg-1&orientation=landscape')`,
            filter: darkMode ? 'brightness(0.7)' : 'none'
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Discover Words That <span className="text-purple-300">Inspire</span> & <span className="text-purple-300">Transform</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md max-w-lg mx-auto md:mx-0">
              Explore our curated collection of powerful quotes to motivate, uplift, and guide you through life's journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="py-3 px-6 bg-purple-600 text-white rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-purple-700 transform hover:scale-105 shadow-lg">
                <i className="fas fa-random mr-2"></i>
                Random Quote
              </button>
              <button className="py-3 px-6 bg-white text-purple-600 rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-gray-100 transform hover:scale-105 shadow-lg">
                <i className="fas fa-bookmark mr-2"></i>
                Save Favorites
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className={`relative p-8 rounded-lg shadow-2xl max-w-md transform transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-90'}`}>
              <i className="fas fa-quote-left text-4xl text-purple-400 opacity-50 absolute top-4 left-4"></i>
              <blockquote className="text-xl md:text-2xl font-serif italic mb-4 pt-6 pl-6">
                The greatest glory in living lies not in never falling, but in rising every time we fall.
              </blockquote>
              <div className="flex justify-between items-center">
                <cite className="text-lg font-semibold not-italic">— Nelson Mandela</cite>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-purple-100 text-purple-600 cursor-pointer transition-all duration-300 hover:bg-purple-200 !rounded-button whitespace-nowrap">
                    <i className="fas fa-heart"></i>
                  </button>
                  <button className="p-2 rounded-full bg-purple-100 text-purple-600 cursor-pointer transition-all duration-300 hover:bg-purple-200 !rounded-button whitespace-nowrap">
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>
              <i className="fas fa-quote-right text-4xl text-purple-400 opacity-50 absolute bottom-4 right-4"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {activeCategory === 'All' ? 'Explore Our Collection' : `${activeCategory} Quotes`}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find wisdom and inspiration in our carefully curated quotes from great minds throughout history.
          </p>
        </div>

        {/* Categories for mobile */}
        <div className="md:hidden mb-8 overflow-x-auto whitespace-nowrap py-2 px-1">
          <div className="inline-flex space-x-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-4 rounded-full whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  activeCategory === category 
                    ? `bg-purple-600 text-white` 
                    : `${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 dark:hover:bg-gray-700`
                } !rounded-button`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuotes.map(quote => (
            <div 
              key={quote.id}
              className={`rounded-lg p-6 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                darkMode 
                  ? 'bg-gray-800 shadow-lg hover:shadow-purple-900/20' 
                  : 'bg-white shadow-md hover:shadow-purple-300/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                 <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-purple-900 text-purple-200"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {quote.category}
                </span>
                <button className={`p-2 rounded-full cursor-pointer transition-colors duration-300 !rounded-button whitespace-nowrap ${
                  darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-500'
                }`}>
                  <i className="fas fa-heart"></i>
                  <span className="ml-1 text-sm">{quote.likes}</span>
                </button>
              </div>
              
              <blockquote className="mb-4">
                <i className="fas fa-quote-left text-sm text-purple-400 mr-1"></i>
                <p className="inline text-lg font-serif italic">{quote.text}</p>
                <i className="fas fa-quote-right text-sm text-purple-400 ml-1"></i>
              </blockquote>
              
              <div className="flex justify-between items-center">
                <cite className={`text-base font-medium not-italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  — {quote.author}
                </cite>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => copyToClipboard(quote.text, quote.id)}
                    className={`p-2 rounded-full cursor-pointer transition-all duration-300 !rounded-button whitespace-nowrap ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {copied === quote.id.toString() ? (
                      <i className="fas fa-check text-green-500"></i>
                    ) : (
                      <i className="fas fa-copy"></i>
                    )}
                  </button>
                  
                  <button className={`p-2 rounded-full cursor-pointer transition-all duration-300 !rounded-button whitespace-nowrap ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="py-3 px-8 bg-purple-600 text-white rounded-button whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-purple-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
            Load More Quotes
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Popular Quotes
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See which quotes are resonating with our community
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className={`rounded-lg p-6 h-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Top Categories
                </h3>
                <ul className="space-y-4">
                  {['Motivation', 'Wisdom', 'Success', 'Love', 'Life'].map((category, index) => (
                    <li key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                          darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {index + 1}
                        </span>
                        <span className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{category}</span>
                      </div>
                      <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {Math.floor(Math.random() * 500) + 200} quotes
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container mx-auto px-4 py-16">
        <div className={`max-w-4xl mx-auto rounded-xl p-8 md:p-12 shadow-xl text-center ${
          darkMode ? 'bg-gray-800' : 'bg-purple-200'
        }`}>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get Daily Inspiration
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Subscribe to receive a new inspiring quote in your inbox every morning to start your day with positivity.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className={`flex-grow px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg sm:mb-0 mb-4 border-none focus:ring-2 focus:ring-purple-500 ${
                darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'
              }`}
            />
            <button className="bg-purple-600 text-white px-6 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-purple-700 !rounded-button">
              Subscribe Now
            </button>
          </div>
          
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-purple-600">Daily</span>
                <span>Quotes</span>
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Inspiring minds with timeless wisdom since 2020.
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`text-xl cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className={`text-xl cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={`text-xl cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className={`text-xl cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Categories
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {categories.filter(cat => cat !== 'All').map(category => (
                  <li key={category}>
                    <a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">Home</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">Contact</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-purple-600"></i>
                  <span>support@dailyquotes.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2 text-purple-600"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-purple-600"></i>
                  <span>123 Inspiration Ave, Creativity City</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 DailyQuotes. All rights reserved.</p>
              <p className="mt-4 md:mt-0">
                Designed with <i className="fas fa-heart text-red-500"></i> for inspiration seekers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// const App = () => {
//   <Allquotes/>
// }
export default App;