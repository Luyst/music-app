import { useContext, useEffect, useState } from 'react';
import Icons from '../Icons';
import { Link } from 'react-router-dom';
import PlayBack from '../PlayBack';
import Thumbnail from '../Thumbnail';
import SongNav from '../SongNav';
import { StreamContext } from '~/context/Streaming';

function Footer({ audio }) {
    const { currentStream, audioRef } = useContext(StreamContext);
    const [isPlaying, setIsPlaying] = useState(false);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handleTimeUpdate = () => {
            setProgress((audioElement.currentTime / audioElement.duration) * 100);
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        audioElement.addEventListener('play', handlePlay);
        audioElement.addEventListener('pause', handlePause);

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);

                audioElement.removeEventListener('play', handlePlay);
                audioElement.removeEventListener('pause', handlePause);
            }
        };
    }, [audioRef, currentStream]);
    const handlePlayPause = () => {
        const audioElement = audioRef.current;
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    return (
        <footer className="wrap  w-full p-3 mb:p-2 mb:fixed mb:bottom-0 mb:bg-secondary-bg  duration-300 ease-in-out">
            {
                <>
                    <div className="audio-player-control relative flex flex-row justify-between items-center px-2 mb:pe-4 h-full w-full mb:h-12 rounded-lg mb:bg-primary-color  mb:px-2  duration-300 ease-in-out ">
                        <div className="w-1/3 mb:w-full mb:h-3/4 mb:hidden">
                            <Thumbnail item={currentStream} size={16} />
                        </div>
                        <div className="w-1/3 mb:w-full mb:h-3/4 mb:block   hidden">
                            <Thumbnail item={currentStream} size={10} />
                        </div>
                        <div className="w-2/5 mb:hidden ">
                            <PlayBack stream={currentStream} audioRef={audio} />
                        </div>
                        <div className=" w-1/3 mb:hidden ">
                            <SongNav audioRef={audio} />
                        </div>
                        <div className="mobile play-button h-full ">
                            <div
                                className="play-pause-button text-4xl flex  justify-center items-center  h-full cursor-pointer hover:scale-110  "
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? <i className="bx bx-pause"></i> : <i className="bx bx-play"></i>}
                            </div>
                        </div>
                        <div className="absolute left-0 bottom-0 mobile flex flex-row  items-center duration-bar h-0.5 w-full bg-white bg-opacity-40  group   rounded-full   ">
                            <div
                                className="progress-bar bg-white h-full rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </>
            }

            <div className="nav mobile duration-300 ease-in-out">
                <ul className="sidebar-header flex flex-row  justify-between rounded-lg h-full">
                    <li>
                        <Link to="/" className="hover:text-primary-color flex flex-col  items-center">
                            {Icons.home}
                            <span className="text-xs">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-primary-color flex flex-col  items-center">
                            {Icons.search}
                            <span className="text-xs">Tìm kiếm</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-primary-color flex flex-col  items-center">
                            {Icons.home}
                            <span className="text-xs">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-primary-color flex flex-col items-center">
                            {Icons.library}
                            <span className="text-xs">Thư viện</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
