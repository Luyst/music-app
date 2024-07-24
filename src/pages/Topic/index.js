import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import nct from 'nhaccuatui-api-full';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import ButtonStream from '~/components/ButtonStream';
import Thumbnail from '~/components/Thumbnail';
import TopShow from '~/components/TopShow';
import jsonData from './json.json';
import MyInfor from '~/components/MyInfor';
const listColor = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5'];

function Topic() {
    const { key } = useParams();
    const [topic, setTopic] = useState(jsonData.topic);
    const [playlists, setPlaylists] = useState(jsonData.topic.playlist);
    const [theme, setTheme] = useState('');
    const [artistDetails, setArtistDetails] = useState([]);
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTopic = async (topicKey) => {
            setLoading(true);
            try {
                if (!topicKey) return;
                const topicDetail = await nct.getTopicDetail(topicKey);
                if (topicDetail.status === 'success') {
                    setTopic(topicDetail.topic);
                    setPlaylists(topicDetail.topic.playlist);
                    setError(false);
                    setLoading(false);
                    return;
                }
                setError(true);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topic details:', error);
                setError(true);
            }
        };

        if (!topic || topic.key !== key) {
            fetchTopic(key);
            const color = listColor[Math.floor(Math.random() * listColor.length)];
            setTheme(color);
        }
    }, [key, topic, playlists, artistDetails]);

    return (
        <div className="wrapper size-full ">
            <Header />
            {false ? (
                <div className="flex justify-center items-center">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : false ? (
                <div className="w-full flex flex-col text-xl justify-center items-center gap-3">
                    <img
                        className="size-64"
                        src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt=""
                    />
                </div>
            ) : (
                <div className="topic-page flex flex-col gap-4">
                    <div
                        className={`flex flex-col relative justify-center items-center bg-cover  bg-no-repeat mb:min-h-80 ${theme} mb:bg-none`}
                    >
                        <img src={topic.coverImageURL} alt="background" className="mb:hidden" />
                    </div>

                    <div className="text-md mt-2 px-4 py-2 ">{topic.description}</div>
                    <div className="title px-4 text-3xl font-bold">{topic.title}</div>
                    <div className="playlist-list grid grid-cols-4 md:grid-cols-3 mb:grid-cols-2 px-4">
                        {playlists.map((playlist) => (
                            <Link
                                to={`/playlist/${playlist.key}`}
                                className="playlist-card p-3 rounded-lg hover:bg-transparent"
                                key={playlist.key}
                            >
                                <div className="thumnail relative  overflow-hidden rounded-lg group ">
                                    <img
                                        src={playlist.thumbnail}
                                        alt=""
                                        className="aspect-square   ease-in-out duration-500  group-hover:scale-125 "
                                    />
                                    <div className="size-full aspect-square absolute top-0 left-0 bg-black group-hover:opacity-60 opacity-0 ease-in-out duration-700"></div>
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center 
                                    items-center play-button bg-white rounded-full aspect-square size-1/5 hidden group-hover:flex hover:scale-125 ease-in-out duration-300"
                                    >
                                        <i className="bx bx-play text-3xl text-black  "></i>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <MyInfor />
        </div>
    );
}

export default Topic;
