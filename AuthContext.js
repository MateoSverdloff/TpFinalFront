import React, { createContext, useState, useContext } from 'react';
import { login as loginService } from './services/UserServices.js';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const login = async (username, password) => {
    try {
      const response = await loginService(username, password);
      if (response.success) {
        setIsAuthenticated(true);
        const decodedUser = jwtDecode(response.token);
        setUser(decodedUser);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);