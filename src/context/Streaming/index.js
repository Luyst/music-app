import React, { createContext, useState } from 'react';

// Tạo context
export const StreamContext = createContext();

// Tạo provider
export const StreamProvider = ({ children }) => {
    const [currentStream, setCurrentStream] = useState(() => {
        const storeStream = localStorage.getItem('streaming');
        return storeStream ? JSON.parse(storeStream) : null;
    });

    const setStream = (song) => {
        setCurrentStream(song);
    };

    return <StreamContext.Provider value={{ currentStream, setStream }}>{children}</StreamContext.Provider>;
};
