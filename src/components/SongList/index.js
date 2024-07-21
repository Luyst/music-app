import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

function SongList({ songList, artistsShow = false, numList = false }) {
    const playSong = () => {};
    const songClick = () => {};
    return (
        <>
            {songList.map((song, index) => (
                <div
                    key={song.key}
                    className="rounded-md song-container w-full flex flex-row justify-between p-2 pe-4 items-center  h-14  hover:bg-transparent"
                    onClick={songClick}
                    onDoubleClick={playSong}
                >
                    <div className="left-container flex flex-row gap-2 items-center">
                        {numList && <div className="text-light-gray font-semibold px-3 text-md">{index + 1}</div>}
                        <Thumbnail item={song} size={12} />
                    </div>

                    <div className="duration">{song.duration}</div>
                </div>
            ))}
        </>
    );
}

export default SongList;
