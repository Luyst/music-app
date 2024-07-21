import React, { useState } from 'react';

function SongNav() {
    const [volume, setVolume] = useState(100);
    const handleVolumeClick = (event) => {
        const volumeBar = event.currentTarget;
        const newVolume = (event.nativeEvent.offsetX / volumeBar.offsetWidth) * 100;
        console.log(event.nativeEvent);
        setVolume(newVolume);
    };
    return (
        <div className="song-nav flex flex-row items-center justify-end text-xl gap-4 text-light-gray hover:*:text-white *:cursor-pointer">
            <div className="streaming-show relative ">
                <input type="checkbox" id="icon-play" className="hidden peer" />
                <label
                    htmlFor="icon-play"
                    className="icon-label  flex items-center h-5 w-4 text-sm border-light-gray border-2 rounded-sm hover:border-white peer-checked:text-teal peer-checked:border-teal peer-checked:scale-110 "
                >
                    <i className="bx bx-play "></i>
                </label>
                <div className="size-1 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-2 bg-teal rounded-full hidden peer-checked:block"></div>
            </div>
            <div className="icon-container relative">
                <input type="checkbox" id="icon-microphone" className="hidden peer" />
                <label htmlFor="icon-microphone" className="icon-label peer-checked:text-teal peer-checked:scale-110">
                    <i className="bx bx-microphone "></i>
                </label>
                <div className="size-1 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 bg-teal rounded-full hidden peer-checked:block"></div>
            </div>
            <div className="playlist-container relative">
                <input type="checkbox" id="icon-playlist" className="hidden peer" />
                <label htmlFor="icon-playlist" className="icon-label peer-checked:text-teal peer-checked:scale-110">
                    <i className="bx bxs-playlist "></i>
                </label>
                <div className="size-1 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 bg-teal rounded-full hidden peer-checked:block"></div>
            </div>
            <div className="volume-container flex flex-row w-1/4 items-center gap-2 ">
                <div className="">
                    <i className="bx bx-volume-full "></i>
                </div>
                <div
                    className="flex flex-row items-center duration-bar h-1 w-full bg-gray group   rounded-full  "
                    onClick={handleVolumeClick}
                >
                    <div className=" progress-bar bg-teal h-full rounded-full" style={{ width: `${volume}%` }}></div>
                    <div className="size-3 bg-white rounded-full -m-1 hidden group-hover:block"></div>{' '}
                </div>
            </div>
            <div className="devide-container relative">
                <input type="checkbox" id="icon-devices" className="hidden peer" />
                <label htmlFor="icon-devices" className="icon-label peer-checked:text-teal peer-checked:scale-110">
                    <i className="bx bxs-devices "></i>
                </label>
                <div className="size-1 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 bg-teal rounded-full hidden peer-checked:block"></div>
            </div>
            <div className="screen-container">
                <input type="checkbox" id="icon-fullscreen" className="hidden peer" />
                <label htmlFor="icon-fullscreen" className="icon-label peer-checked:text-teal peer-checked:scale-110">
                    <i className="bx bx-fullscreen "></i>
                </label>
            </div>
        </div>
    );
}

export default SongNav;
