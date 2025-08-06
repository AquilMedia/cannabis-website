import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = { id: number; name: string; token: string } | null;

type AuthContextType = {
    user: User;
    login: () => void;
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

    const login = () => setUser({ id: 1, name: 'John Doe', token: 'dummy-token-123' });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};