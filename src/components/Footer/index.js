import { getSong } from 'nhaccuatui-api-full';
import { useEffect, useRef, useState } from 'react';
import Icons from '../Icons';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const remainderSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
};

function Footer({ songID }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // State to manage current time
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchSong = async () => {
            if (songID) {
                const song = await getSong(songID);
                setCurrentSong(song.song);
            }
        };
        fetchSong();
    }, [songID]);

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
            setProgress((audioElement.currentTime / audioElement.duration) * 100);
        };

        const handleEnded = () => {
            // Logic for what happens when song ends (e.g., play next song)
        };

        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('ended', handleEnded);
            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('ended', handleEnded);
            };
        }
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

    return (
        <footer className="wrap w-full p-6 h-24 ">
            {currentSong && (
                <>
                    <audio ref={audioRef} hidden controls>
                        <source src={currentSong.streamUrls[1].streamUrl} />
                    </audio>
                    <div className="audio-player flex flex-row justify-start h-full  ">
                        <div className="song-info flex flex-row gap-2 h-full min-w-52 items-center ">
                            <img src={currentSong.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover" />
                            <div className="info flex flex-col justify-center h-full">
                                <div className="name-artist">{currentSong.artists[0].name}</div>
                                <div className="name-song">{currentSong.title}</div>
                            </div>
                        </div>
                        <div className="audio-container flex flex-col justify-center items-center w-full ">
                            <ul className="audio-control flex items-center gap-4 ">
                                <li
                                    className="prev-button text-4xl hover:text-primary-color  cursor-pointer "
                                    onClick={handlePrevious}
                                >
                                    <i className={Icons.preButton}></i>
                                </li>
                                <li
                                    className="play-pause-button text-5xl font-light hover:text-primary-color cursor-pointer"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <i className={Icons.pause}></i> : <i className={Icons.play}></i>}
                                </li>
                                <li
                                    className="next-button text-4xl hover:text-primary-color cursor-pointer"
                                    onClick={handleNext}
                                >
                                    <i className={Icons.nextButton}></i>
                                </li>
                            </ul>
                            <ul className="duration-container flex items-center gap-4 w-full max-w-2xl">
                                <li className="time-current">{formatTime(currentTime)}</li>
                                <li className="duration-bar h-1 w-full bg-gray hover:*:bg-primary-color   rounded-full  cursor-pointer overflow-hidden">
                                    <div
                                        className="progress-bar bg-white h-full "
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </li>
                                <li className="duration-time">{currentSong.duration}</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </footer>
    );
}

export default Footer;
