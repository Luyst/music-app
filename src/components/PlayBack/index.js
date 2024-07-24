import React, { useContext, useEffect, useState } from 'react';
import Icons from '../Icons';
import { StreamContext } from '~/context/Streaming';
import nct from 'nhaccuatui-api-full';

function PlayBack({ stream, audioRef }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0); // State to manage current time
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const { playListStream, setPlayListStream, setStream } = useContext(StreamContext);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const remainderSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
            setProgress((audioElement.currentTime / audioElement.duration) * 100);
        };

        const handleEnded = async () => {
            if (playListStream) {
                const index = playListStream.indexOf(stream.key);
                try {
                    const nextSong = await nct.getSong(playListStream[index + 1]);
                    if (nextSong.status === 'success') {
                        localStorage.setItem('streaming', JSON.stringify(nextSong.song));
                        setStream(nextSong.song);
                    }
                } catch (error) {
                    console.error('Error fetching song:', error);
                }
            }
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleEnded);
        audioElement.addEventListener('play', handlePlay);
        audioElement.addEventListener('pause', handlePause);

        setDuration(audioElement.duration);

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('ended', handleEnded);
                audioElement.removeEventListener('play', handlePlay);
                audioElement.removeEventListener('pause', handlePause);
            }
        };
    }, [audioRef, stream]);

    const handlePlayPause = () => {
        const audioElement = audioRef.current;
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    const handleNext = async () => {
        if (playListStream) {
            const index = playListStream.indexOf(stream.key);
            try {
                const nextSong = await nct.getSong(playListStream[index + 1]);
                if (nextSong.status === 'success') {
                    localStorage.setItem('streaming', JSON.stringify(nextSong.song));
                    setStream(nextSong.song);
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }
    };

    const handlePrevious = async () => {
        if (playListStream) {
            const index = playListStream.indexOf(stream.key);

            try {
                const nextSong = await nct.getSong(playListStream[index - 1]);
                if (nextSong.status === 'success') {
                    localStorage.setItem('streaming', JSON.stringify(nextSong.song));
                    setStream(nextSong.song);
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }
    };

    const handleProgressBarClick = (event) => {
        const progressBar = event.currentTarget;
        const newTime = (event.nativeEvent.offsetX / progressBar.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    return (
        <div className="audio-container flex flex-col justify-center items-center mb:hidden">
            {stream ? (
                <React.Fragment>
                    <ul className="audio-control flex items-center gap-4 hover:*:text-white text-dark-gray">
                        <li className="text-2xl">
                            <i className="bx bx-shuffle"></i>
                        </li>
                        <li className="prev-button text-4xl cursor-pointer text-dark-gray" onClick={handlePrevious}>
                            <i className={Icons.preButton}></i>
                        </li>
                        <li
                            className="play-pause-button text-5xl text-white cursor-pointer hover:scale-110"
                            onClick={handlePlayPause}
                        >
                            {isPlaying ? <i className={Icons.pause}></i> : <i className={Icons.play}></i>}
                        </li>
                        <li className="next-button text-4xl text-dark-gray cursor-pointer" onClick={handleNext}>
                            <i className={Icons.nextButton}></i>
                        </li>
                        <li className="text-2xl text-dark-gray">
                            <i className="bx bx-repeat bx-rotate-180"></i>
                        </li>
                    </ul>
                    <ul className="duration-container flex items-center gap-4 w-full max-w-2xl">
                        <li className="time-current text-xs">{formatTime(currentTime)}</li>
                        <li
                            className="flex flex-row items-center duration-bar h-1 w-full bg-gray group rounded-full"
                            onClick={handleProgressBarClick}
                        >
                            <div
                                className="progress-bar bg-teal h-full rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <div className="size-3 bg-white rounded-full -m-1 hidden group-hover:block"></div>
                        </li>
                        <li className="duration-time text-xs">{stream.duration}</li>
                    </ul>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <ul className="audio-control flex items-center gap-4 hover:*:text-white text-dark-gray">
                        <li className="text-2xl">
                            <i className="bx bx-shuffle"></i>
                        </li>
                        <li className="prev-button text-4xl cursor-pointer text-dark-gray" onClick={handlePrevious}>
                            <i className={Icons.preButton}></i>
                        </li>
                        <li className="play-pause-button text-5xl text-white cursor-pointer hover:scale-110">
                            {isPlaying ? <i className={Icons.pause}></i> : <i className={Icons.play}></i>}
                        </li>
                        <li className="next-button text-4xl text-dark-gray cursor-pointer" onClick={handleNext}>
                            <i className={Icons.nextButton}></i>
                        </li>
                        <li className="text-2xl text-dark-gray">
                            <i className="bx bx-repeat bx-rotate-180"></i>
                        </li>
                    </ul>
                    <ul className="duration-container flex items-center gap-4 w-full max-w-2xl">
                        <li className="time-current text-xs"></li>
                        <li className="flex flex-row items-center duration-bar h-1 w-full bg-gray group rounded-full">
                            <div
                                className="progress-bar bg-teal h-full rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <div className="size-3 bg-white rounded-full -m-1 hidden group-hover:block"></div>
                        </li>
                        <li className="duration-time text-xs"></li>
                    </ul>
                </React.Fragment>
            )}
        </div>
    );
}

export default PlayBack;
