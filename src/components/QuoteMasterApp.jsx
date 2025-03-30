import React from 'react';
import Navbar from './Navbar';
import QuoteGenerator from './QuoteGenerator';
import AIQuoteGenerator from './AIQuoteGenerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Main App Component
const QuoteMasterApp = () => {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main>
          <QuoteGenerator />
          <AIQuoteGenerator />
        </main>
      </div>
    );
  };
  
  export default QuoteMasterApp;