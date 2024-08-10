import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/appbar/Navbar';
import LandingPage from './components/appbar/landingPage';
import MainQuiz from './components/appbar/MainQuiz';
import Calendar from './components/appbar/Calender';
import Footer from './components/appbar/footer';
import Auth from './components/appbar/Auth';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/quiz" element={<MainQuiz />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
