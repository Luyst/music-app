import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import nct from 'nhaccuatui-api-full';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import TopShow from '~/components/TopShow';
import TopicShow from './TopicShow';
import MyInfor from '~/components/MyInfor';
import ButtonStream from '~/components/ButtonStream';

function Search() {
    let { key } = useParams();
    const [songList, setSongList] = useState([]);
    const [playList, setPlayList] = useState([]);
    const [firstSong, setFirstSong] = useState();
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);

    const [topKey, setTopKey] = useState();
    const [topic, setTopic] = useState();

    useEffect(() => {
        setLoading(true);
        const fetchSearch = async (key) => {
            const data = await nct.searchByKeyword(key);

            if (data.status === 'success') {
                setPlayList(data.search.playlist.playlist);
                setSongList(data.search.song.song);

                setFirstSong(data.search.song.song[0]);
                setLoading(false);
                setError(false);
                return;
            }
            setLoading(false);
            setError(true);
        };
        const fetchNoSearch = async () => {
            const data = await nct.getTopKeyword();
            const topic = await nct.getTopics();

            if (data.status === 'success' && topic.status === 'success') {
                setTopic(topic);
                setTopKey(data.topkeyword);
                setError(false);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(true);
        };
        if (key) {
            fetchSearch(key);
        } else {
            fetchNoSearch();
        }
    }, [key]);
    return (
        <>
            <Header notSearch={false} />
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : error ? (
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
            ) : key ? (
                <main className="body flex flex-col gap-4 px-3 pt-5">
                    <div className="first-result flex flex-row gap-3 w-full  ">
                        <div className="result  w-1/2 h-full">
                            <div className="text-2xl font-bold mb-3">Kết quả hàng đầu</div>
                            <div
                                className="relative container-card bg-primary-color p-6 rounded-lg h-56 flex flex-col justify-center gap-4 overflow-hidden
                                                hover:bg-secondary-color group cursor-pointer duration-500"
                            >
                                {firstSong && (
                                    <div>
                                        <div className="thumbnail size-24 rounded-lg overflow-hidden group-hover:shadow-lg  group-hover:shadow-black duration-500">
                                            <img src={firstSong.thumbnail} alt="thumbnail" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold w-4/5 truncate">{firstSong.title}</div>
                                            <div className="bottom flex flex-row gap-2 items-center text-sm text-light-gray">
                                                <div>Bài hát</div>
                                                <div className="">·</div>
                                                <div className="artist-list flex flex-row  w-ful">
                                                    {firstSong.artists.map((artist) => (
                                                        <React.Fragment key={artist.artistId}>
                                                            <Link
                                                                to={`/artist/${artist.shortLink}`}
                                                                className="font-semibold  hover:underline"
                                                            >
                                                                {artist.name}
                                                            </Link>
                                                            <h4 className="me-2">,</h4>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className=" flex justify-center items-center absolute right-5 bottom-6 size-12 translate-y-28  group-hover:translate-y-0
                                                    duration-500 ease-in-out rounded-full bg-teal hover:scale-110"
                                        >
                                            <ButtonStream song={firstSong} />
                                        </div>
                                    </div>
                                )}
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
            ) : (
                <div className="no-search w-full p-4 flex flex-col gap-6">
                    <div className="top-key-search  flex flex-col gap-2">
                        <div className="text-2xl font-bold mb-6">Mọi người quan tâm</div>
                        {topKey.map((key) => (
                            <Link
                                to={`/search/${key.name}`}
                                key={key.order}
                                className="flex flex-row items-center bg-transparent p-2 mb-2 rounded-lg hover:text-light-blue hover:bg-dark-gray"
                                style={{ width: 'auto' }}
                            >
                                <div className="mr-2 text-light-blue">#{key.order}</div>
                                <div className="">{key.name}</div>
                            </Link>
                        ))}
                    </div>
                    <div className="explore">
                        <div className="text-2xl font-bold mb-6 ">Chủ đề phổ biến</div>
                        <TopicShow topic={topic.topic} />
                    </div>
                </div>
            )}
            <MyInfor />
        </>
    );
}

export default Search;
