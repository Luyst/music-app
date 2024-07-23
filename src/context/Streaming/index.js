import React, { createContext, useEffect, useRef, useState } from 'react';

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
    const audioRef = useRef(null);
    const setStream = (song) => {
        setCurrentStream(song);
    };
    const handleSpaceKeyPress = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            if (audioRef.current.paused) {
                audioRef.current.play();
                return;
            }
            audioRef.current.pause();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleSpaceKeyPress);
        return () => {
            document.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current && currentStream.streamUrls[0]) {
            if (audioRef.current.src) {
                audioRef.current.src = currentStream.streamUrls[0].streamUrl;
                audioRef.current.play();
                return;
            }
            audioRef.current.src = currentStream.streamUrls[0].streamUrl;
        }
    }, [currentStream]);

    return (
        <StreamContext.Provider value={{ currentStream, setStream, audioRef, rightSidebar, setRightSidebar }}>
            {children}
            {currentStream && <audio ref={audioRef} hidden />}{' '}
        </StreamContext.Provider>
    );
};
