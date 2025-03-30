


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample background images - in a real implementation, you would import these or use URLs
const backgroundImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // Mountain landscape
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // Beach sunset
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', // Mountain vista
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', // Forest
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', // Sunlight through trees
];

// Sample font combinations
const fontStyles = [
  { quote: 'font-serif', author: 'font-sans' },
  { quote: 'font-sans', author: 'font-serif italic' },
  { quote: 'font-mono', author: 'font-sans' },
  { quote: 'font-serif italic', author: 'font-sans' },
];

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
);

const AIQuoteGenerator = () => {
  const [topic, setTopic] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [overlay, setOverlay] = useState('bg-black/30');
  const quoteRef = useRef(null);

  // Function to cycle through backgrounds
  useEffect(() => {
    if (generatedQuote) {
      setBackgroundIndex(Math.floor(Math.random() * backgroundImages.length));
      setFontIndex(Math.floor(Math.random() * fontStyles.length));
    }
  }, [generatedQuote]);

  const generateAIQuote = async () => {
    setIsLoading(true);
    setGeneratedQuote(null);

    try {
      // In a real implementation, you would use your actual API key and endpoint
      // This is a simulated API call for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate fake quote based on topic
      const quotes = {
        nature: "In every walk with nature one receives far more than he seeks.",
        success: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        happiness: "Happiness is not something ready-made. It comes from your own actions.",
        life: "Life is what happens when you're busy making other plans.",
        love: "The best thing to hold onto in life is each other.",
      };
      
      const topic_key = Object.keys(quotes).find(key => topic.toLowerCase().includes(key)) || 'life';
      const quoteText = quotes[topic_key];

      setGeneratedQuote({
        text: quoteText,
        author: 'AI Generated',
      });
    } catch (error) {
      console.error('Error generating quote:', error);
      setGeneratedQuote({
        text: 'Failed to generate quote. Please try again.',
        author: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQuoteImage = async () => {
    if (!quoteRef.current) return;
    
    const html2canvas = (await import('html2canvas')).default;
    
    try {
      // Add a class temporarily for better rendering
      quoteRef.current.classList.add('downloading');
      
      const canvas = await html2canvas(quoteRef.current, { 
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      quoteRef.current.classList.remove('downloading');
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `quote-${topic.replace(/\s+/g, '-')}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const changeOverlay = () => {
    const overlays = ['bg-black/30', 'bg-black/50', 'bg-indigo-900/30', 'bg-blue-900/40', 'bg-purple-900/30'];
    const currentIndex = overlays.indexOf(overlay);
    const nextIndex = (currentIndex + 1) % overlays.length;
    setOverlay(overlays[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Inspirational Quote Generator</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Generate beautiful quotes to inspire your day</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter a topic (nature, success, love...)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                />
                {topic && (
                  <button
                    onClick={() => setTopic('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateAIQuote}
                disabled={!topic || isLoading}
                className={`w-full p-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  !topic || isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? <LoadingSpinner /> : 'Generate Quote'}
              </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              {generatedQuote && (
                <motion.div
                  key={generatedQuote.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div
                    ref={quoteRef}
                    style={{
                      backgroundImage: `url(${backgroundImages[backgroundIndex]}?auto=format&fit=crop&w=1200&q=80)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className="relative overflow-hidden rounded-xl aspect-square max-w-md mx-auto shadow-2xl"
                  >
                    <div className={`absolute inset-0 ${overlay} transition-colors duration-300`}></div>
                    
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
                      <div className="text-5xl opacity-20 mb-2">"</div>
                      <div className={`flex-grow flex items-center text-center max-h-full overflow-hidden ${fontStyles[fontIndex].quote}`}>
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">
                          {generatedQuote.text}
                        </p>
                      </div>
                      <div className={`mt-4 border-t border-white/30 pt-4 w-1/3 text-center ${fontStyles[fontIndex].author}`}>
                        — {generatedQuote.author}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setBackgroundIndex((backgroundIndex + 1) % backgroundImages.length);
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-medium transition-colors duration-200"
                    >
                      Change Background
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFontIndex((fontIndex + 1) % fontStyles.length);
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-medium transition-colors duration-200"
                    >
                      Change Font
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={changeOverlay}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-medium transition-colors duration-200"
                    >
                      Change Overlay
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadQuoteImage}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Image
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>© 2025 Inspirational Quote Generator | Created with React & Tailwind CSS</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIQuoteGenerator;