import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Button = ({ children, onClick, className = '', disabled = false, variant = 'default', size = 'default' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition duration-200';
  const sizeStyles = {
    default: '',
    sm: 'px-3 py-1 text-sm',
  };
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// Quote Generator Component
const QuoteGenerator = () => {
  const [quote, setQuote] = useState({
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  });

  const [quotesData, setQuotesData] = useState([]);

  useEffect(() => {
    // Load quotes from the JSON file
    async function loadQuotes() {
      try {
        const response = await fetch('/quotes.json'); // Assuming quotes.json is in the public folder
        const data = await response.json();
        console.log("Data : ", data);
        setQuotesData(data);
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    }

    loadQuotes();
  }, []);

  const generateQuote = (subject = 'Motivational') => {
    const filteredQuotes = quotesData.filter((q) => q.tags.includes(subject));

    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      setQuote({
        text: randomQuote.content,
        author: randomQuote.author,
      });
    } else {
      console.error('No quotes found with the specified subject.');
    }
  };

  const handleSubjectClick = (subject) => {
    generateQuote(subject);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-center">Motivational Quote</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-900 p-6 rounded-lg shadow-lg">
          <blockquote className="font-serif italic text-xl text-center">
              "{quote.text}"
            </blockquote>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              - {quote.author}
            </p>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button onClick={() => generateQuote('Motivational')}>
              Generate Another
            </Button>
            <Button variant="outline">
              Download Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Quote Types */}
      <div className="mt-8 flex justify-center space-x-4">
        {['Love', 'Funny', 'Motivational'].map((type) => (
          <Button
            key={type}
            variant="secondary"
            size="sm"
            onClick={() => handleSubjectClick(type)}
          >
            {type} Quotes
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuoteGenerator;