import Sidebar from '~/components/Sidebar';
import RightSidebar from '~/components/RightSidebar';
import Footer from '~/components/Footer';
import { useContext, useEffect, useRef, useState } from 'react';
import { StreamContext } from '~/context/Streaming';

function DefaultLayout({ children }) {
    const audioRef = useRef();
    const stream = useContext(StreamContext).currentStream;
    const handleSpaceKeyPress = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            if (audioRef.current.paused) {
                audioRef.current.play();
                return;
            }
            audioRef.current.pause();
            console.log(audioRef.current.paused);
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleSpaceKeyPress);
        return () => {
            document.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current && stream.streamUrls[0]) {
            audioRef.current.src = stream.streamUrls[0].streamUrl;
            audioRef.current.play();
        }
    }, [stream]);

    return (
        <div className="flex flex-col   h-dvh  ">
            {stream && <audio ref={audioRef} hidden />}{' '}
            <div className="content-container p-2 grow flex flex-row justify-start gap-2  w-full overflow-hidden mb:p-0 ">
                <Sidebar />
                <div className="w-full  bg-secondary-bg rounded-lg  overflow-y-scroll mb:p-1">
                    <main className="">{children}</main>
                    <div className="mobile  bg-secondary-bg w-full h-40"></div>
                </div>
                <RightSidebar />
            </div>
            <Footer audio={audioRef} />
        </div>
    );
}

export default DefaultLayout;
