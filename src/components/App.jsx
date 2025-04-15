import React from 'react';
import './App.css';
import './index.css';

import Navbar from './Navbar';
import QuoteGenerator from './QuoteGenerator';
import AIQuoteGenerator from './AIQuoteGenerator';
import RandomQuotesPage from './RandomQuotesPage';
import MotivationalQuotesPage from './MotivationalQuotesPage';
import LifeQuotesPage from './LifeQuotesPage ';
import QuotesPage from './QuotesPage'; // Assuming you have QuotesPage
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllReligionQuotesPage from './AllReligionQuotesPage';
import TrendingQuotesPage from './TrendingQuotesPage';
import FamilyQuotesPage from './FamilyQuotesPage';
import FriendshipQuotesPage from './FriendshipQuotesPage';
import HumorQuotesPage from './HumorQuotesPage';
import InspirationQuotesPage from './InspirationQuotesPage';
import KidsQuotesPage from './SuccessQuotesPage';
import SwamiVivekanandaQuotesPage from './SwamiVivekanandaQuotesPage';
import NatureQuotesPage from './NatureQuotesPage';
import GodQuotesPage from './GodQuotesPage';
import TravelQuotesPage from './TravelQuotesPage';
import LoveQuotesPage from './LoveQuotesPage'; // Ensure you have this import
import MusicQuotesPage from './MusicQuotesPage'; // Ensure you have this import
import AloneQuotesPage from './AloneQuotesPage';
import SuccessQuotesPage from './SuccessQuotesPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuoteCategoriesFooter from './QuoteCategoriesFooter';


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/all-religion" element={<AllReligionQuotesPage />} />
        <Route path="/trending" element={<TrendingQuotesPage />} />
        <Route path="/" element={<MotivationalQuotesPage />} />
        <Route path="/love-quotes" element={<LoveQuotesPage />} />
        <Route path="/life-quotes" element={<LifeQuotesPage />} />
        <Route path="/random" element={<RandomQuotesPage />} />
        <Route path="/ai" element={<AIQuoteGenerator />} />
        <Route path="/ins-quotes" element={<InspirationQuotesPage />} />
        <Route path="/friendship" element={<FriendshipQuotesPage />} />
        <Route path="/humor" element={<HumorQuotesPage />} />
        <Route path="/swami-vivekananda" element={<SwamiVivekanandaQuotesPage />} />
        <Route path="/alone" element={<AloneQuotesPage />} />
        <Route path="/travel" element={<TravelQuotesPage />} />
        <Route path="/nature-quotes" element={<NatureQuotesPage />} />
        <Route path="/family" element={<FamilyQuotesPage />} />
        <Route path="/god-quotes" element={<GodQuotesPage />} />
        <Route path="/success" element={<SuccessQuotesPage />} />
      </Routes>
      <QuoteCategoriesFooter/>
    </Router>
  );
}

export default App;

