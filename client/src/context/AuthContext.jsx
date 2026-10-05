import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);
const KEY = 'civicbridge_user';
const AUTH_KEY = 'auth_user';

const demoUsers = [
  { id: 'user-priya', name: 'Priya Sharma', email: 'priya.sharma@example.com', age: 21, state: 'Tamil Nadu', education: 'Undergraduate', employment: 'Student', income: 450000, interests: ['Education', 'Skill Development', 'Employment'] },
  { id: 'user-arun', name: 'Arun Kumar', email: 'arun.kumar@example.com', age: 29, state: 'Tamil Nadu', education: 'Graduate', employment: 'Self-employed', income: 380000, interests: ['Entrepreneurship', 'Skill Development', 'Financial Assistance'] }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY) || localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem('auth_token');
    }
  }, [user]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUser(data.user);
    return data;
  };

  const loginWithGoogle = async (email) => {
    const selected = demoUsers.find((u) => u.email === email) || demoUsers[0];
    setUser(selected);
    return selected;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, demoUsers, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
