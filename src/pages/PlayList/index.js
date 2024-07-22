import nct from 'nhaccuatui-api-full';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import ButtonStream from '~/components/ButtonStream';
import Thumbnail from '~/components/Thumbnail';
import TopShow from '~/components/TopShow';
import MyInfor from '~/components/MyInfor';

const listColor = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5'];

function PlayList() {
    const { playlistKey } = useParams();
    const [playList, setPlayList] = useState([]);
    const [song, setSong] = useState();
    const [theme, setTheme] = useState('');

    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');

        return `${day} tháng ${month}, ${year}`;
    };
    useEffect(() => {
        const fetchPlayList = async (playlistKey) => {
            setLoading(true);
            try {
                if (!playlistKey) return;
                const playList = await nct.getPlaylistDetail(playlistKey);
                console.log(playList);
                if (playList.status === 'success') {
                    setPlayList(playList.playlist);
                    setSong(playList.playlist.songs);
                    setError(false);
                    console.log(error);
                    return;
                }
                setError(true);
            } catch (error) {
                console.error('Error fetching song details:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (!playList || playList.key !== playlistKey) {
            fetchPlayList(playlistKey);
            const color = listColor[Math.floor(Math.random() * listColor.length)];
            setTheme(color);
        }
    }, [playlistKey]);
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
                <div className="song-page flex flex-col gap-4">
                    <div className={`background-cover  flex flex-row items-end  p-4 pt-20 ${theme} `}>
                        <div className="song-detail flex flex-row gap-2 z-10">
                            <div className="thumbnail-container flex items-end">
                                <img className="rounded-md  object-contain" src={playList.thumbnail} alt="thumbnail" />
                            </div>
                            <div className="song-infor flex flex-col font-extrabold ps-3 justify-end">
                                <div className="text-sm">{playList.type === 'SONG' ? 'Bài hát' : 'PlayList'}</div>
                                <div
                                    className="text -ms-1 cursor-default text-left mb-5"
                                    style={{ fontSize: `${playList.title.length > 30 ? '3rem' : '6rem'}` }}
                                >
                                    {playList.title}
                                </div>
                                <div className="more-info flex flex-row text-sm gap-2 items-center">
                                    <div className="ava-artist">
                                        <img
                                            className="size-8 rounded-full"
                                            src={playList.artists[0].imageUrl}
                                            alt=""
                                        />
                                    </div>
                                    <Link to={`/artist/${playList.artists[0].shortLink}`}>
                                        <div className="main-artist">{playList.artists[0].name}</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="controler flex flex-row gap-4 px-4">
                        <ButtonStream song={song[0]} size={14} />
                        <div className=" flex justify-center items-center rounded-full text-text-secondary hover:text-white hover:scale-110">
                            <i className="bx bx-plus-circle text-4xl"></i>{' '}
                        </div>
                        <div className=" flex justify-center items-center rounded-full text-text-secondary hover:text-white  hover:scale-110">
                            <i className="bx bx-dots-horizontal-rounded text-4xl"></i>{' '}
                        </div>
                    </div>
                    <div className="song-container  flex flex-row justify-between mx-2 pe-4 items-center  h-14 text-light-gray border-b border-b-dark-gray">
                        <div className="left-container flex flex-row gap-2 items-center">
                            <div className="text-light-gray font-semibold px-3 text-md">#</div>
                            <div>Tiêu đề</div>
                        </div>

                        <div className="duration text-2xl">
                            <i className="bx bx-time"></i>
                        </div>
                    </div>
                    <SongList songList={song} numList={true} />
                    <div className="more-infor text-light-gray text-xs p-4">
                        <div>{formatDate(playList.dateModify)}</div>
                        <div>{playList.uploadBy.fullName}</div>
                    </div>
                    <MyInfor />
                </div>
            )}
        </div>
    );
}

export default PlayList;
