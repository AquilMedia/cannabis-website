import { decryptData, encryptData } from '@/utils/storageHelper';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  token: string;
} | null;

type AuthContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData && storedData !== 'undefined' && storedData !== 'null') {
      const decryptedData = decryptData(storedData);

      if (decryptedData) {
        const { user: storedUser, timestamp } = decryptedData;
        const now = Date.now();

        // check expiry
        if (now - timestamp < ONE_DAY_MS) {
          setUser(storedUser);
        } else {
          localStorage.removeItem('user'); // expired
        }
      } else {
        localStorage.removeItem('user');
      }
    }
    setIsMounted(true);
  }, []);

  const login = (userData: User) => {
    if (!userData) {
      console.warn("Tried to login with null/undefined user");
      return;
    }

    setUser(userData);

    const payload = {
      user: userData,
      timestamp: Date.now(),
    };

    localStorage.setItem("user", encryptData(payload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
