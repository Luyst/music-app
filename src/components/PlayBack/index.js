import { useEffect, useRef, useState } from 'react';
import Icons from '../Icons';

function PlayBack({ stream }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // State to manage current time
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

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

        const handleEnded = () => {
            // Logic for what happens when song ends (e.g., play next song)
        };

        // Add event listeners
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleEnded);

        // Set initial duration
        setDuration(audioElement.duration);

        // Clean up event listeners on unmount or when dependencies change
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('ended', handleEnded);
            }
        };
    }, [audioRef]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        // Logic to handle next song
    };

    const handlePrevious = () => {
        // Logic to handle previous song
    };
    const handleProgressBarClick = (event) => {
        const progressBar = event.currentTarget;
        const newTime = (event.nativeEvent.offsetX / progressBar.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };
    return (
        <div className="audio-container flex flex-col justify-center items-center  mb:hidden">
            <audio ref={audioRef} src={stream.streamUrls[0].streamUrl} hidden />

            <ul className="audio-control flex items-center gap-4 hover:*:text-white   text-dark-gray">
                <li className="text-2xl">
                    <i class="bx bx-shuffle"></i>
                </li>
                <li className="prev-button text-4xl   cursor-pointer  text-dark-gray" onClick={handlePrevious}>
                    <i className={Icons.preButton}></i>
                </li>
                <li
                    className="play-pause-button text-5xl  text-white  cursor-pointer hover:scale-110  "
                    onClick={handlePlayPause}
                >
                    {isPlaying ? <i className={Icons.pause}></i> : <i className={Icons.play}></i>}
                </li>
                <li className="next-button text-4xl text-dark-gray  cursor-pointer " onClick={handleNext}>
                    <i className={Icons.nextButton}></i>
                </li>
                <li className="text-2xl text-dark-gray">
                    <i class="bx bx-repeat bx-rotate-180"></i>
                </li>
            </ul>
            <ul className="duration-container flex items-center gap-4 w-full max-w-2xl">
                <li className="time-current text-xs">{formatTime(currentTime)}</li>
                <li
                    className="flex flex-row items-center duration-bar h-1 w-full bg-gray group   rounded-full  "
                    onClick={handleProgressBarClick}
                >
                    <div className="progress-bar bg-teal h-full rounded-full" style={{ width: `${progress}%` }}></div>
                    <div className="size-3 bg-white rounded-full -m-1 hidden group-hover:block"></div>
                </li>
                <li className="duration-time text-xs">{stream.duration}</li>
            </ul>
        </div>
    );
}

export default PlayBack;
