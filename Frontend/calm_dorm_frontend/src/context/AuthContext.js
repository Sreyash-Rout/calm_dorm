// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const signup = async (username, password) => {
    try {
      const response = await axios.post('/api/signup', { username, password });
      setAuthToken(response.data.token);
      setUser({ username });
      localStorage.setItem('authToken', response.data.token);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error; // Propagate the error to be handled in the component
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      setAuthToken(response.data.token);
      setUser({ username });
      localStorage.setItem('authToken', response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Propagate the error to be handled in the component
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
