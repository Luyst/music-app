import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Thumbnail({ item, size }) {
    const dimension = `${size * 4}px`;
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleMouseEnter = () => {
        if (!hasAnimated) {
            setHasAnimated(true);
        }
    };
    return (
        <div className="thumbnail flex flex-row gap-2 h-full  items-center truncate mb:w-full ">
            <img
                src={item.thumbnail || item.imageUrl}
                alt="thumbnail"
                className={` object-cover mb:size-10 ${item.type ? 'rounded-md' : 'rounded-full'}`}
                style={{ height: dimension, width: dimension }}
            />
            <div className="info flex flex-col justify-center h-full mb:text-xs">
                {item.artists ? (
                    <div className="infor-song overflow-hidden">
                        <Link to={`/${item.type.toLowerCase()}/${item.key || item.artistId}`}>
                            <div className="item-title text-sm font-semibold  hover:underline">{item.title}</div>
                        </Link>
                        <div className="item-artists flex flex-row *:text-light-gray truncate">
                            {item.artists.map((artist, index) => (
                                <div key={artist.artistId} className="artist flex flex-row items-center">
                                    <Link
                                        to={`/artist/${artist.shortLink}`}
                                        className="text-xs font-semibold hover:underline"
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < item.artists.length - 1 && <h4 className="me-1 text-xs">,</h4>}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="song-infor flex flex-col justify-center">
                        <div className="song-title text-md font-bold  hover:cursor-default">Nghệ sĩ</div>

                        <Link to={`/artist/${item.shortLink}`} className="text-lg font-bold hover:underline">
                            {item.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Thumbnail;
