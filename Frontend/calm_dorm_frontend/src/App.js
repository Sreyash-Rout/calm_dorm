import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/appbar/Navbar';
import LandingPage from './components/appbar/landingPage';
import MainQuiz from './components/appbar/MainQuiz';
import Calendar from './components/appbar/Calender';
import Footer from './components/appbar/footer';
import MultiplayerGaming from './components/appbar/gaming'; // Import the new component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<MainQuiz />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/multiplayer-gaming" element={<MultiplayerGaming />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
