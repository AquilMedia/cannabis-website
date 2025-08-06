import React, { createContext, useContext, useState, ReactNode } from 'react';

type LikeContextType = {
    likes: number;
    incrementLikes: () => void;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const useLike = () => {
    const context = useContext(LikeContext);
    if (!context) throw new Error('useLike must be used within LikeProvider');
    return context;
};

export const LikeProvider = ({ children }: { children: ReactNode }) => {
    const [likes, setLikes] = useState(0);
    const incrementLikes = () => setLikes(l => l + 1);

    return (
        <LikeContext.Provider value={{ likes, incrementLikes }}>
            {children}
        </LikeContext.Provider>
    );
};