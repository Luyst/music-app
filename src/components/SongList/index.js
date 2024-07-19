import { Link } from 'react-router-dom';

function SongList({ songList, artistsShow = false }) {
    const playSong = () => {};
    const songClick = () => {};
    return (
        <>
            {songList.map((song) => (
                <div
                    key={song.key}
                    className="rounded-md song-container w-full flex flex-row justify-between p-2 pe-4 items-center  h-14  hover:bg-secondary-color"
                    onClick={songClick}
                    onDoubleClick={playSong}
                >
                    <div className="left-container flex flex-row gap-2">
                        <div className="thumbnail  overflow-hidden ">
                            <img
                                className="object-contain h-14 p-1  rounded-xl "
                                src={song.thumbnail}
                                alt={song.title}
                            />
                        </div>
                        <div className="song-infor flex flex-col justify-center">
                            <Link to={`/song/${song.key}`}>
                                <div className="song-title text-sm font-semibold  hover:underline">{song.title}</div>
                            </Link>
                            <div className="song-artists flex flex-row *:text-light-gray ">
                                {song.artists.map((artist) => (
                                    <>
                                        <Link
                                            to={`/artist/${artist.shortLink}`}
                                            className="text-xs font-semibold hover:underline"
                                        >
                                            {artist.name}
                                        </Link>
                                        <h4 className="me-1 text-xs">,</h4>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="duration">{song.duration}</div>
                </div>
            ))}
        </>
    );
}

export default SongList;
