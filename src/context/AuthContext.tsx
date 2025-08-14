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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
    const decryptedUser = decryptData(storedUser);
    if (decryptedUser) {
      setUser(decryptedUser);
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
  localStorage.setItem("user", encryptData(userData));
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
