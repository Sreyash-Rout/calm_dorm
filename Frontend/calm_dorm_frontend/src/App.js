import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/appbar/Navbar';
import LandingPage from './components/appbar/landingPage';
import MainQuiz from './components/appbar/MainQuiz';
import Calendar from './components/appbar/Calender';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<MainQuiz />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;