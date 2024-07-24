import nct from 'nhaccuatui-api-full';

import { Link } from 'react-router-dom';

import Thumbnail from '../Thumbnail';
import React, { useContext, useEffect, useState } from 'react';
import { StreamContext } from '~/context/Streaming';
import MusicWave from '../MusicWave';

function SongList({ songList, artistsShow = false, numList = false, duration = true }) {
    const { setStream, currentStream, audioRef } = useContext(StreamContext);
    const [streamPlaying, setStreamPlaying] = useState(false);
    const playSong = async (keysong) => {
        if (currentStream.key !== keysong) {
            try {
                const fetchStream = await nct.getSong(keysong);
                if (fetchStream.status === 'success') {
                    const song = fetchStream.song;
                    localStorage.setItem('streaming', JSON.stringify(song));
                    setStream(song);
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }
        if (audioRef && currentStream.key === keysong) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setStreamPlaying(true);

                return;
            } else {
                audioRef.current.pause();
                setStreamPlaying(false);
            }
        }
    };
    useEffect(() => {
        if (audioRef) {
            const audioElement = audioRef.current;
            if (!audioElement) return;

            const handlePlay = () => {
                setStreamPlaying(true);
            };

            const handlePause = () => {
                setStreamPlaying(false);
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
        }
    }, [audioRef]);
    useEffect(() => {
        if (audioRef.current && !audioRef.current.paused) {
            setStreamPlaying(true);
        }
    }, []);
    return (
        <>
            {songList.map((song, index) => (
                <div
                    key={song.key}
                    className={`rounded-md song-container w-full flex flex-row justify-between px-2 pe-2 items-center group h-14 mb:p-0  hover:bg-transparent ${
                        currentStream && currentStream.key === song.key ? 'text-teal' : 'text-light-gray'
                    }`}
                    onDoubleClick={() => playSong(song.key)}
                >
                    <div className=" flex flex-row gap-2 items-center w-full ">
                        {numList && (
                            <div>
                                {currentStream && currentStream.key === song.key && streamPlaying ? (
                                    <div className="mb:hidden">
                                        <div className=" font-semibold px-3 w-10  text-md group-hover:hidden ">
                                            <MusicWave />
                                        </div>
                                        <div className=" font-semibold px-1 w-10  text-3xl hidden group-hover:block ">
                                            <i className="bx bx-pause " onClick={() => playSong(song.key)}></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb:hidden">
                                        <div className=" font-semibold px-3 w-10  text-md group-hover:hidden">
                                            {index + 1}
                                        </div>
                                        <div className=" font-semibold px-2 w-10  text-2xl hidden group-hover:block ">
                                            <i className="bx bx-play" onClick={() => playSong(song.key)}></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <Thumbnail item={song} size={12} />
                    </div>

                    {duration && <div className="duration mb:hidden">{song.duration}</div>}
                </div>
            ))}
        </>
    );
}

export default SongList;
