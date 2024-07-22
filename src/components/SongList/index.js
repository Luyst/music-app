import nct from 'nhaccuatui-api-full';

import { Link } from 'react-router-dom';

import Thumbnail from '../Thumbnail';
import { useContext } from 'react';
import { StreamContext } from '~/context/Streaming';

function SongList({ songList, artistsShow = false, numList = false }) {
    const setStream = useContext(StreamContext).setStream;
    const playSong = async (keysong) => {
        try {
            const fetchStream = await nct.getSong(keysong);
            if (fetchStream.status === 'success') {
                const song = fetchStream.song;
                localStorage.setItem('streaming', JSON.stringify(song));
                console.log(song);
                setStream(song);
            }
        } catch (error) {
            console.error('Error fetching song:', error);
        }
    };
    return (
        <>
            {songList.map((song, index) => (
                <div
                    key={song.key}
                    className="rounded-md song-container w-full flex flex-row justify-between p-2 pe-4 items-center group h-14  hover:bg-transparent"
                    onDoubleClick={() => playSong(song.key)}
                >
                    <div className="left-container flex flex-row gap-2 items-center w-2/5">
                        {numList && (
                            <div>
                                <div className="text-light-gray font-semibold px-3 w-10  text-md group-hover:hidden">
                                    {index + 1}
                                </div>
                                <div className="text-light-gray font-semibold px-3 w-10  text-2xl hidden group-hover:block">
                                    <i className="bx bx-play" onClick={() => playSong(song.key)}></i>
                                </div>
                            </div>
                        )}

                        <Thumbnail item={song} size={12} />
                    </div>

                    <div className="duration">{song.duration}</div>
                </div>
            ))}
        </>
    );
}

export default SongList;
