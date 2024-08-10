// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const signup = async (username, password) => {
    try {
      const response = await axios.post('/api/signup', { username, password });
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error; // Add this line to throw error for handling in the component
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Add this line to throw error for handling in the component
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;