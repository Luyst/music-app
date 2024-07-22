import React, { createContext, useState } from 'react';

// Tạo context
export const StreamContext = createContext();

// Tạo provider
export const StreamProvider = ({ children }) => {
    const [currentStream, setCurrentStream] = useState(() => {
        const storeStream = localStorage.getItem('streaming');
        return storeStream || storeStream === 'undefined' ? JSON.parse(storeStream) : null;
    });
    const [rightSidebar, setRightSidebar] = useState(() => {
        return currentStream ? 'StreamSong' : 'hidden';
    });
    const setStream = (song) => {
        setCurrentStream(song);
    };

    return (
        <StreamContext.Provider value={{ currentStream, setStream, rightSidebar, setRightSidebar }}>
            {children}
        </StreamContext.Provider>
    );
};
