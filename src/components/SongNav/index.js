import React, { useContext, useEffect, useRef, useState } from 'react';
import { StreamContext } from '~/context/Streaming';

function SongNav({ audioRef }) {
    const [volume, setVolume] = useState(100);
    const [previousVolume, setPreviousVolume] = useState();
    const { setRightSidebar, currentStream } = useContext(StreamContext);
    const [selected, setSelected] = useState(useContext(StreamContext).rightSidebar);
    const volumeBarRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume, audioRef]);
    const handleVolumeClick = (event) => {
        const newVolume = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;
        setVolume(newVolume);
    };
    const volumeClick = () => {
        if (volume === 0) {
            setVolume(previousVolume ? previousVolume : 100);
            return;
        }
        setPreviousVolume(volume);
        setVolume(0);
    };
    const handleChecked = (type) => () => {
        const newSelection = selected === type ? null : type;
        setSelected(newSelection);
        setRightSidebar(newSelection ? type : 'hidden');
    };
    const handleVolumeDrag = (event) => {
        const volumeBar = volumeBarRef.current;
        if (volumeBar) {
            const rect = volumeBar.getBoundingClientRect();
            const newVolume = ((event.clientX - rect.left) / rect.width) * 100;
            setVolume(Math.min(Math.max(newVolume, 0), 100));
        }
    };
    const iconButtons = [
        { type: 'StreamSong', icon: 'bx bx-play' },
        { type: 'StreamLyric', icon: 'bx bx-microphone' },
        { type: 'PlayList', icon: 'bx bxs-playlist' },
    ];

    return (
        <div className="song-nav flex items-center justify-end  text-xl gap-4 text-light-gray cursor-pointer">
            {currentStream && (
                <React.Fragment>
                    {iconButtons.map(({ type, icon }) => (
                        <button
                            key={type}
                            className={`icon-label flex items-center justify-center  rounded-sm transform transition  ${
                                type === 'StreamSong' && 'border-2 h-5 w-4 text-sm'
                            }
                        ${selected === type ? 'text-teal  scale-110' : ''}`}
                            onClick={handleChecked(type)}
                        >
                            <i className={icon}></i>
                            {selected === type && (
                                <div className="size-1 absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-2 bg-teal rounded-full"></div>
                            )}
                        </button>
                    ))}
                    <div className="volume-container flex items-center gap-2 w-1/4 group">
                        <div className="button-volume" onClick={volumeClick}>
                            {volume >= 75 && volume <= 100 && <i className="bx bx-volume-full"></i>}
                            {volume >= 1 && volume < 75 && <i className="bx bx-volume-low"></i>}
                            {volume === 0 && <i className="bx bx-volume-mute"></i>}
                        </div>
                        <div
                            className="flex items-center h-1 w-full bg-gray group rounded-full"
                            onClick={handleVolumeClick}
                            ref={volumeBarRef}
                            onMouseDown={(e) => {
                                document.addEventListener('mousemove', handleVolumeDrag);
                                document.addEventListener(
                                    'mouseup',
                                    () => {
                                        document.removeEventListener('mousemove', handleVolumeDrag);
                                    },
                                    { once: true },
                                );
                            }}
                        >
                            <div
                                className="bg-teal h-full group-hover:h-1.5 rounded-full ease-in-out "
                                style={{ width: `${volume}%` }}
                            ></div>
                            <div className="size-3 bg-white rounded-full hidden group-hover:block"></div>
                        </div>
                    </div>
                    <button
                        className={`icon-label peer-checked:text-teal peer-checked:scale-110 active:text-teal active:scale-110`}
                    >
                        <i className="bx bxs-devices "></i>
                    </button>
                    <button
                        className={`icon-label peer-checked:text-teal peer-checked:scale-110
                    active:text-teal active:scale-110`}
                    >
                        <i className="bx bx-fullscreen "></i>
                    </button>
                </React.Fragment>
            )}
        </div>
    );
}

export default SongNav;
