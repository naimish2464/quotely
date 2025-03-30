import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const QuotesPage = ({ category }) => {
  const [quotes, setQuotes] = useState([]);
  const [heading, setHeading] = useState('');
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    async function loadQuotes() {
      try {
        const response = await fetch('/quotes.json');
        const data = await response.json();
        const filteredQuotes = data.filter((q) => q.tags.includes(category));
        setQuotes(filteredQuotes);
      } catch (error) {
        console.error(`Error loading ${category} quotes:`, error);
      }
    }

    loadQuotes();

    // Set heading and gradient based on category
    switch (category) {
      case 'Kids':
        setHeading('Kids Quotes');
        setGradient('from-blue-200 to-purple-200');
        break;
      case 'Music':
        setHeading('Music Quotes');
        setGradient('from-purple-300 to-indigo-300');
        break;
      case 'Family':
        setHeading('Family Quotes');
        setGradient('from-orange-200 to-yellow-200');
        break;
      case 'Nature':
        setHeading('Nature Quotes');
        setGradient('from-green-200 to-blue-200');
        break;
      case 'Travel':
        setHeading('Travel Quotes');
        setGradient('from-blue-300 to-indigo-300');
        break;
      case 'Olympic':
        setHeading('Olympic Quotes');
        setGradient('from-red-300 to-yellow-300');
        break;
      case 'Miscellaneous':
        setHeading('Miscellaneous Quotes');
        setGradient('from-gray-300 to-gray-400');
        break;
      case 'Humour':
        setHeading('Humor Quotes');
        setGradient('from-yellow-400 to-green-400');
        break;
      case 'Friendship':
        setHeading('Friendship Quotes');
        setGradient('from-pink-300 to-yellow-300');
        break;
      case 'Inspiration':
        setHeading('Inspiration Quotes');
        setGradient('from-purple-200 to-pink-200');
        break;
      case 'All Religion':
        setHeading('All Religion Quotes');
        setGradient('from-indigo-200 to-yellow-200');
        break;
      case 'Love':
        setHeading('Love Quotes');
        setGradient('from-pink-100 to-red-100');
        break;
      case 'Life':
        setHeading('Life Quotes');
        setGradient('from-green-100 to-yellow-100');
        break;
      case 'Motivational':
        setHeading('Motivational Quotes');
        setGradient('from-yellow-200 to-orange-400');
        break;
      default:
        setHeading('Quotes');
        setGradient('from-gray-200 to-gray-300');
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      <main>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-8">{heading}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((quote) => (
              <Card key={quote._id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardHeader>
                  {/* <CardTitle className="text-center">{heading.slice(0, -1)}</CardTitle> */}
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`bg-gradient-to-r ${gradient} dark:from-gray-700 dark:to-gray-900 p-4 rounded-lg shadow-lg`}>
                    <blockquote className="text-xl italic text-gray-800 dark:text-white mb-2">
                      "{quote.content}"
                    </blockquote>
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      - {quote.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotesPage;