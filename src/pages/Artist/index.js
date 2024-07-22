import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import nct from 'nhaccuatui-api-full'; // Import API

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import TopShow from '~/components/TopShow';
import ButtonStream from '~/components/ButtonStream';
import MyInfor from '~/components/MyInfor';

const listColor = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8'];

function Artist() {
    const { key } = useParams();
    const [song, setSong] = useState();
    const [playList, setPlayList] = useState();
    const [error, setError] = useState(false);
    const [theme, setTheme] = useState('');
    const [artistDetails, setArtistDetails] = useState([]);
    const [more, setMore] = useState([]);
    const [loading, setLoading] = useState(true);

    function convertKey(str) {
        if (!str) return null;
        const withoutDiacritics = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // Thay thế khoảng trắng bằng dấu gạch ngang
        const result = withoutDiacritics.replace(/\s+/g, '-').toLowerCase();
        return result;
    }

    useEffect(() => {
        const fetchArtistDetails = async (key) => {
            setLoading(true);
            try {
                if (!key) return;
                const artistDetails = await nct.getArtistDetail(key);
                const morePlaylist = await nct.explore({
                    type: 'song', // or "playlist" or "mv"
                });

                if (artistDetails.status === 'success') {
                    setArtistDetails(artistDetails.artist);
                    setSong(artistDetails.song.song);
                    artistDetails.playlist && setPlayList(artistDetails.playlist.playlist);
                    setMore(morePlaylist.data);
                    setError(false);
                    return;
                }
                setError(true);
            } catch (error) {
                console.error('Error fetching artist details:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (!artistDetails || convertKey(artistDetails.name) !== key) {
            fetchArtistDetails(key);
            const color = listColor[Math.floor(Math.random() * listColor.length)];
            setTheme(color);
        }
    }, [key]);

    return (
        <div className="wrapper size-full ">
            <Header />
            {loading ? (
                <div className="text-center">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="w-full flex flex-col text-xl justify-center items-center gap-3">
                    <img
                        className="size-64"
                        src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt=""
                    />
                </div>
            ) : (
                <div className={`artist-page flex flex-col gap-4  w-full `}>
                    <div
                        className={` flex flex-col justify-end min-h-80  bg-cover bg-no-repeat  ${theme}`}
                        style={{ backgroundImage: `url(${artistDetails.coverImageURL})` }}
                    >
                        <div className="artist-details flex flex-col items-start p-4 pt-20 z-30">
                            <div className="flex flex-row font-bold items-center ">
                                <i className="bx bxs-user-check me-2 text-2xl size-8 flex justify-center items-center bg-light-blue rounded-full"></i>{' '}
                                {artistDetails.role.map((role, index) => (
                                    <React.Fragment key={index}>
                                        <div>{role}</div>
                                        {index < artistDetails.role.length - 1 && <div className="me-2">,</div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="text-6xl font-extrabold mt-4">{artistDetails.name}</div>
                            <div className="text-lg mt-2">{artistDetails.description}</div>
                        </div>
                    </div>
                    <div className="controler flex flex-row gap-4 px-4">
                        <ButtonStream song={song} size={14} />
                        <div className=" flex justify-center items-center rounded-full text-text-secondary hover:text-white hover:scale-110">
                            <i className="bx bx-plus-circle text-4xl"></i>{' '}
                        </div>
                        <div className=" flex justify-center items-center rounded-full text-text-secondary hover:text-white  hover:scale-110">
                            <i className="bx bx-dots-horizontal-rounded text-4xl"></i>{' '}
                        </div>
                    </div>
                    <div className="artist-songs p-2">
                        <div className="p-4 text-2xl font-bold">Phổ biến</div>
                        <SongList songList={song} numList={true} />
                    </div>
                    {playList && (
                        <div className="artist-playlist">
                            <div className="p-4 text-2xl font-bold">Danh sách phát nhạc</div>
                            <TopShow TopShow={playList} />
                        </div>
                    )}
                    <div className="artist-playlist">
                        <div className="p-4 text-2xl font-bold">Mọi người cũng nghe</div>
                        <SongList songList={more.slice(0, 5)} numList={true} />
                    </div>

                    <MyInfor />
                </div>
            )}
        </div>
    );
}

export default Artist;
