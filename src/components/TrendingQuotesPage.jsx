import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp, FaInstagram, FaCopy, FaShareAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TrendingQuotesPage = () => {
  const [trendingQuotes, setTrendingQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchTrendingQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/trending-quotes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrendingQuotes(data.data);
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingQuotes();
  }, []);

  const handleCopy = (quote) => {
    navigator.clipboard.writeText(quote);
    toast.success('Quote copied to clipboard!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleWhatsAppShare = (quote) => {
    const message = encodeURIComponent(`"${quote.quoteText}"`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleInstagramShare = async (quote) => {
    const message = encodeURIComponent(`"${quote.quoteText}"`);

    try {
      const response = await fetch(
        'https://graph.facebook.com/v18.0/instagram_oembed?url=https://www.instagram.com/&access_token=YOUR_INSTAGRAM_GRAPH_API_TOKEN'
      );
      const data = await response.json();

      if (data && data.html) {
        const instagramLink = `https://www.instagram.com/?text=${message}`;
        window.open(instagramLink, '_blank');
      } else {
        const instagramLink = `https://www.instagram.com/?text=${message}`;
        window.open(instagramLink, '_blank');
      }
    } catch (err) {
      console.error('Error sharing to instagram:', err);
      const instagramLink = `https://www.instagram.com/?text=${message}`;
      window.open(instagramLink, '_blank');
    }
  };

  if (loading) return <div className="text-center p-4">Loading trending quotes...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 text-gray-900 dark:text-white relative overflow-hidden">
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-500">
            Trending Quotes
          </h1>
          <div className="flex flex-col items-center space-y-16">
            {trendingQuotes.map((quote) => (
              <div
                key={quote._id}
                className={`transition-all duration-700 transform ${
                  fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } w-full max-w-3xl`}
              >
                <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <div className="relative p-8 md:p-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/40 to-indigo-100/40 dark:from-blue-900/20 dark:to-indigo-900/20 z-0"></div>
                      <div className="relative z-10">
                        <blockquote className="font-serif italic text-xl md:text-2xl text-center leading-relaxed text-gray-800 dark:text-gray-100 transition-colors duration-300 mb-6">
                          "{quote.quoteText}"
                          <div className="mt-2 w-16 h-1 mx-auto bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                        </blockquote>
                      </div>
                    </div>
                    <div className="px-8 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleCopy(quote.quoteText)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                          aria-label="Copy quote"
                        >
                          <FaCopy className="h-4 w-4" />
                          <span className="text-sm font-medium">Copy</span>
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleWhatsAppShare(quote)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-300"
                          aria-label="Share on WhatsApp"
                        >
                          <FaWhatsapp className="h-4 w-4" />
                          <span className="text-sm font-medium">WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleInstagramShare(quote)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
                          aria-label="Share on Instagram"
                        >
                          <FaInstagram className="h-4 w-4" />
                          <span className="text-sm font-medium">Instagram</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default TrendingQuotesPage;