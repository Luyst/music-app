import { useContext, useEffect, useState } from 'react';
import { StreamContext } from '~/context/Streaming';
import nct from 'nhaccuatui-api-full';

function ButtonStream({ song, size, playList }) {
    const { setStream, currentStream, audioRef, setPlayList } = useContext(StreamContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const s = size * 4 + 'px';

    const playPause = async (keysong) => {
        if (!currentStream || currentStream.key !== song.key) {
            try {
                const fetchStream = await nct.getSong(keysong);
                if (fetchStream.status === 'success') {
                    localStorage.setItem('streaming', JSON.stringify(song));
                    setStream(song);
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }
        if (playList) {
            const keys = playList.map((s) => (s = s.key));
            localStorage.setItem('playlist', JSON.stringify(keys));
            localStorage.setItem('playlistShow', JSON.stringify(playList));
            setPlayList(keys);
        }
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };
    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        audioElement.addEventListener('play', handlePlay);
        audioElement.addEventListener('pause', handlePause);

        // Clean up event listeners on unmount or when dependencies change
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('play', handlePlay);
                audioElement.removeEventListener('pause', handlePause);
            }
        };
    }, [audioRef, currentStream]);
    useEffect(() => {
        if (currentStream && currentStream.key === song.key) {
            if (!audioRef.current.paused) {
                setIsPlaying(true);
            }
        }
    }, []);

    return (
        <div
            key={song.key}
            className={`flex justify-center items-center rounded-full    bg-teal hover:scale-105    `}
            style={{ height: s, width: s }}
            onClick={() => playPause(song.key)}
        >
            {isPlaying ? <i className="bx bx-pause text-4xl  "></i> : <i className="bx bx-play text-4xl  "></i>}
        </div>
    );
}

export default ButtonStream;
