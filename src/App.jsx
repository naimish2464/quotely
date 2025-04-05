import React from 'react';
import './App.css';
import './index.css';

import Navbar from './components/Navbar';
import QuoteGenerator from './components/QuoteGenerator';
import AIQuoteGenerator from './components/AIQuoteGenerator';
import RandomQuotesPage from './components/RandomQuotesPage';
import MotivationalQuotesPage from './components/MotivationalQuotesPage';
import LifeQuotesPage from './components/LifeQuotesPage ';
import QuotesPage from './components/QuotesPage'; // Assuming you have QuotesPage
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllReligionQuotesPage from './components/AllReligionQuotesPage';
import TrendingQuotesPage from './components/TrendingQuotesPage';
import FamilyQuotesPage from './components/FamilyQuotesPage';
import FriendshipQuotesPage from './components/FriendshipQuotesPage';
import HumorQuotesPage from './components/HumorQuotesPage';
import InspirationQuotesPage from './components/InspirationQuotesPage';
import KidsQuotesPage from './components/SuccessQuotesPage';
import SwamiVivekanandaQuotesPage from './components/SwamiVivekanandaQuotesPage';
import NatureQuotesPage from './components/NatureQuotesPage';
import GodQuotesPage from './components/GodQuotesPage';
import TravelQuotesPage from './components/TravelQuotesPage';
import LoveQuotesPage from './components/LoveQuotesPage'; // Ensure you have this import
import MusicQuotesPage from './components/MusicQuotesPage'; // Ensure you have this import
import AloneQuotesPage from './components/AloneQuotesPage';
import SuccessQuotesPage from './components/SuccessQuotesPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import { useEffect } from 'react';



function App() {

  // useEffect(() => {
    
  //   const disableRightClick = (event) => event.preventDefault();
  //   const disableInspect = (event) => {
  //     if (event.ctrlKey && ["u", "s", "i", "j", "h"].includes(event.key)) {
  //       event.preventDefault();
  //     }
  //     if (event.key === "F12") {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", disableRightClick);
  //   document.addEventListener("keydown", disableInspect);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //     document.removeEventListener("keydown", disableInspect);
  //   };
  // }, []);

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
      <Footer/>
    </Router>
  );
}

export default App;