import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Thumbnail({ item, size, mobile = false }) {
    const dimension = `${size * 4}px`;

    return (
        <>
            {item ? (
                <div className="thumbnail flex flex-row gap-2 h-full w-full items-center truncate mb:w-full ">
                    <img
                        src={item.thumbnail || item.imageUrl}
                        alt="thumbnail"
                        className={` object-cover aspect-square ${mobile && 'mb:hidden'} ${
                            item.type ? 'rounded-md' : 'rounded-full'
                        }`}
                        style={{ height: dimension, width: dimension }}
                    />
                    <div className="info flex flex-col justify-center h-full mb:text-xs max-w-72 w-full overflow-hidden">
                        {item.artists ? (
                            <div className="infor-song overflow-hidden    ">
                                <Link to={`/${item.type.toLowerCase()}/${item.key || item.artistId}`}>
                                    <div className="item-title text-sm font-semibold truncate  hover:underline">
                                        {item.title}
                                    </div>
                                </Link>
                                <div className="item-artists flex flex-row *:text-light-gray overflow-ellipsis ">
                                    {item.artists.map((artist, index) => (
                                        <div key={artist.artistId} className="artist flex flex-row items-center  ">
                                            <Link
                                                to={artist.shortLink && `/artist/${artist.shortLink}`}
                                                className={`text-xs font-semibold hover:underline ${
                                                    !artist.shortLink && 'cursor-not-allowed'
                                                }`}
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
                                <Link
                                    to={item.shortLink && `/artist/${item.shortLink}`}
                                    className={`text-lg font-bold hover:underline ${
                                        !item.shortLink && 'cursor-not-allowed'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="thumbnail flex flex-row gap-2 h-full  items-center truncate mb:w-full ">
                    <img
                        src="https://www.shutterstock.com/image-vector/no-music-line-icon-musical-260nw-2188668381.jpg"
                        className={` object-cover mb:size-10 rounded-md h-full aspect-square size-12`}
                        alt="no img"
                    />
                </div>
            )}
        </>
    );
}

export default Thumbnail;
