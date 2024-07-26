import Header from '~/components/Header';
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { UserContext } from '~/context/UserProvider';

function Collecition() {
    const { user } = useContext(UserContext);

    const [typeOfShow, setTypeOfShow] = useState('Danh sách');

    const shows = ['Danh sách', 'Lưới'];

    return (
        <>
            <Header mobilePage="Bộ sưu tập" />
            <div className="flex flex-row items-center text-light-gray gap-2 text-xl hover:text-white hover:scale-105 cursor-pointer">
                {typeOfShow === shows[0] && <i className="bx bx-list-ul" onClick={() => setTypeOfShow(shows[1])}></i>}
                {typeOfShow === shows[1] && <i className="bx bx-grid-alt" onClick={() => setTypeOfShow(shows[0])}></i>}
            </div>
            <div className={`content-container ${typeOfShow === shows[2] ? 'grid grid-cols-1' : 'flex flex-col'}`}>
                {user.playlistSaved.map((playlist, index) =>
                    typeOfShow === shows[0] ? (
                        <Link
                            to={`/playlist/${playlist.key}`}
                            key={index}
                            className={`p-1.5 flex flex-row gap-2 rounded-lg cursor-pointer
                                                     h-16 w-full size-16 hover:bg-transparent`}
                        >
                            <img
                                className="aspect-square h-full rounded-md"
                                src={playlist.thumbnail}
                                alt={playlist.title}
                            />
                            <div className={`flex flex-col w-full overflow-hidden '' : 'hidden'`}>
                                <div className="text-md truncate w-full">{playlist.title}</div>
                                <div className="flex flex-row gap-1 text-light-gray text-sm font-semibold truncate">
                                    <div>Danh sách phát</div>
                                    <div>·</div>
                                    <div className="truncate">{playlist.uploadBy}</div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link
                            to={`/playlist/${playlist.key}`}
                            key={index}
                            className={`p-1.5 gap-2 h-full g rounded-lg cursor-pointer
                                                 'h-16 w-full' : 'size-16'} hover:bg-transparent`}
                        >
                            <img
                                className="aspect-square h-full rounded-md"
                                src={playlist.thumbnail}
                                alt={playlist.title}
                            />
                            <div className={`flex flex-col w-full overflow-hidden  '' : 'hidden'}`}>
                                <div className="text-md truncate w-full">{playlist.title}</div>
                                <div className="flex flex-row gap-1 text-light-gray text-sm font-semibold truncate">
                                    <div>Danh sách phát</div>
                                    <div>·</div>
                                    <div className="truncate">{playlist.uploadBy}</div>
                                </div>
                            </div>
                        </Link>
                    ),
                )}
            </div>
        </>
    );
}

export default Collecition;
