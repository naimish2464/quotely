import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { ChevronLeft, ChevronRight, Copy, Share2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Background particle component
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-60">
      <div className="particles-container">
        {Array(20).fill().map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-700 dark:to-purple-900 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const AllReligionQuotesPage = () => {
  const [allReligionQuotes, setAllReligionQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  
  const quotesPerPage = 20;

  useEffect(() => {
    async function loadAllReligionQuotes() {
      try {
        setLoading(true);
        const response = await fetch('/quotes.json');
        const data = await response.json();
        const filteredQuotes = data.filter((q) => q.tags.includes('All Religion'));
        setAllReligionQuotes(filteredQuotes);

        console.log('All Religion Quotes Length:', filteredQuotes.length);

        setLoading(false);
        setTimeout(() => setFadeIn(true), 100);
      } catch (error) {
        console.error('Error loading all religion quotes:', error);
        setLoading(false);
      }
    }

    loadAllReligionQuotes();
  }, []);

  
  // Pagination logic
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = allReligionQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(allReligionQuotes.length / quotesPerPage);


    console.log('Quotes Per Page:', quotesPerPage);
    console.log('Total Pages:', totalPages);

  const paginate = (pageNumber) => {
    console.log("page number", pageNumber);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    setFadeIn(false);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setFadeIn(true), 300);
    }, 300);
  };

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

  const handleShare = (quote, author) => {
    const message = encodeURIComponent(`"${quote}" - ${author}`);
    
    // Create sharing menu
    const shareData = {
      title: 'Share Quote',
      text: `"${quote}" - ${author}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData)
        .catch(err => {
          console.error('Error sharing:', err);
          window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    } else {
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 5;
    
    if (totalPages <= maxVisibleButtons) {
      // Show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited page numbers with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 text-gray-900 dark:text-white relative overflow-hidden">
      <ParticleBackground />
      
      <ToastContainer />
      
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transition-all duration-500">
            All Religion Quotes
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-16">
                {currentQuotes.map((quote) => (
                  <div 
                    key={quote._id} 
                    className={`transition-all duration-700 transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} w-full max-w-3xl`}
                  >
                    <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 overflow-hidden rounded-2xl">
                      <CardContent className="p-0">
                        <div className="relative p-8 md:p-10">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 dark:from-indigo-900/20 dark:to-purple-900/20 z-0"></div>
                          
                          <div className="relative z-10">
                            <blockquote className="font-serif italic text-xl md:text-2xl text-center leading-relaxed text-gray-800 dark:text-gray-100 transition-colors duration-300 mb-6">
                              "{quote.content}"
                              <div className="mt-2 w-16 h-1 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                            </blockquote>
                            
                            <p className="mt-6 text-right font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                              — {quote.author}
                            </p>
                          </div>
                        </div>
                        
                        <div className="px-8 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                          <div className="flex gap-4">
                            <button 
                              onClick={() => handleCopy(quote.content)} 
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300" 
                              aria-label="Copy quote"
                            >
                              <Copy className="h-4 w-4" />
                              <span className="text-sm font-medium">Copy</span>
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => handleShare(quote.content, quote.author)} 
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300" 
                            aria-label="Share quote"
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav className="inline-flex items-center rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-1 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center h-10 w-10 rounded-lg mr-1 transition-all duration-300 ${
                        currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {getPageNumbers().map((number, index) => (
                      <button
                        key={index}
                        onClick={() => number !== '...' ? paginate(number) : null}
                        className={`flex items-center justify-center h-10 w-10 rounded-lg mx-1 transition-all duration-300 ${
                          number === '...' 
                            ? 'text-gray-500 dark:text-gray-400 cursor-default' 
                            : number === currentPage
                              ? 'bg-indigo-600 text-white font-medium shadow-md'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                        aria-label={number === '...' ? 'More pages' : `Page ${number}`}
                        aria-current={number === currentPage ? 'page' : null}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center h-10 w-10 rounded-lg ml-1 transition-all duration-300 ${
                        currentPage === totalPages 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default AllReligionQuotesPage;