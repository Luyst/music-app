import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import nct from 'nhaccuatui-api-full';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import TopShow from '~/components/TopShow';
import Icons from '~/components/Icons';

const songInfo = require('./songdemo.json');
const data = require('./datademo.json');

function Search() {
    let { key } = useParams();
    const [songList, setSongList] = useState([]);
    const [playList, setPlayList] = useState([]);
    const [firstSong, setFirstSong] = useState([]);
    const [error, setError] = useState(true);

    // useEffect(() => {
    //     const fetchFirstResul = async (songKey) => {
    //         const songInfo = await nct.getSong(songKey);
    //         if (songInfo.status === 'success') {
    //             setFirstSong(songInfo.song);
    //         }
    //     };
    //     const fetchHome = async () => {
    //         const data = await nct.searchByKeyword(key);

    //         console.log(data);
    //         if (data.status === 'success') {
    //             setPlayList(data.search.playlist);
    //             setSongList(data.search.song);
    //             console.log(songList);
    //             fetchFirstResul(songList.song[0].key);
    //             setError(false);
    //             return;
    //         }
    //         setError(true);
    //     };
    //     fetchHome();
    // }, [key]);
    const fetchFirstResul = (songKey) => {
        setFirstSong(songInfo.song);
    };

    useEffect(() => {
        const fetchJson = async () => {
            if (data.status === 'success') {
                setPlayList(data.search.playlist.playlist);
                setSongList(data.search.song.song);
                console.log(data.search.song.song[0].artists);
                fetchFirstResul(data.search.song.song[0].key); // Corrected the path to access the first song key
                setError(false);
            } else {
                setError(true);
            }
        };

        fetchJson();
    }, [key]);
    return (
        <>
            <Header notSearch={false} />
            {error ? (
                <>
                    <div className="w-full flex flex-col text-xl justify-center items-center gap-3">
                        <img
                            className="size-64"
                            src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                            alt=""
                        />
                        {error}
                    </div>
                </>
            ) : (
                <main className="body flex flex-col gap-4 px-3 pt-5">
                    <div className="first-result flex flex-row gap-3 w-full  ">
                        <div className="result  w-1/2 h-full">
                            <div className="text-2xl font-bold mb-3">Kết quả hàng đầu</div>
                            <div
                                className="relative container-card bg-primary-color p-6 rounded-lg h-56 flex flex-col justify-center gap-4 overflow-hidden
                                            hover:bg-secondary-color group cursor-pointer duration-500"
                            >
                                <div className="thumbnail size-24 rounded-lg overflow-hidden group-hover:shadow-lg  group-hover:shadow-black duration-500">
                                    <img src={firstSong.thumbnail} alt="thumbnail" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{firstSong.title}</div>
                                    <div className="bottom flex flex-row gap-2 items-center text-sm text-light-gray">
                                        <div>Bài hát</div>
                                        <div className="">·</div>
                                        <div className="artist-list flex flex-row  w-ful">
                                            {firstSong.artists.map((artist) => (
                                                <>
                                                    <Link
                                                        to={`/artist/${artist.shortLink}`}
                                                        className="font-semibold  hover:underline"
                                                    >
                                                        {artist.name}
                                                    </Link>
                                                    <h4 className="me-2">,</h4>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className=" flex justify-center items-center absolute right-5 bottom-6 size-12 translate-y-28  group-hover:translate-y-0 
                                                duration-500 ease-in-out rounded-full bg-teal hover:scale-110"
                                >
                                    <i class="bx bx-play text-4xl   "></i>{' '}
                                </div>
                            </div>
                        </div>
                        <div className="related-result w-full overflow-hidden   ">
                            <div className=" title text-2xl font-bold  mb-3">Đề xuất</div>
                            <div className="list-container  rounded-lg flex flex-col  justify-start ">
                                <SongList songList={songList.slice(0, 4)} artistsShow={true} />
                            </div>
                        </div>
                    </div>

                    <TopShow TopShow={songList} title="Bài hát" />
                    <TopShow TopShow={playList} title="PlayList" />
                </main>
            )}
        </>
    );
}

export default Search;
