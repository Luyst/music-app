import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import nct from 'nhaccuatui-api-full';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import ButtonStream from '~/components/ButtonStream';
import Thumbnail from '~/components/Thumbnail';
import TopShow from '~/components/TopShow';
import MyInfor from '~/components/MyInfor';
const listColor = ['bg-1', 'bg-2', 'bg-4', 'bg-5', 'bg-6', 'bg-8', 'bg-7'];

function Song() {
    const { key } = useParams();
    const [song, setSong] = useState();
    const [artists, setArtists] = useState([]);
    const [artistDetails, setArtistDetails] = useState([]);

    const [theme, setTheme] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    useEffect(() => {
        const fetchArtistSong = async (artistsKey) => {
            setLoading(true);
            try {
                if (!artistsKey || artistsKey.length === 0) return;
                const promises = artistsKey.map(async (artist) => {
                    const artistDetails = await nct.getArtistDetail(artist.shortLink);
                    return artistDetails;
                });

                const details = await Promise.all(promises);
                const filteredDetails = details.filter((item) => item.status !== 'error');
                if (filteredDetails.length > 0) {
                    setArtistDetails(filteredDetails);
                    setLoading(false);
                    return;
                }
                setArtistDetails(['not found']);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching artist details:', error);
            }
        };
        const fetchSong = async (songKey) => {
            setLoading(true);
            try {
                if (!songKey) return;
                const songInfo = await nct.getSong(songKey);
                if (songInfo.status === 'success') {
                    setSong(songInfo.song);
                    setArtists(songInfo.song.artists);
                    setError(false);
                    setLoading(false);

                    return;
                }
                setError(true);
            } catch (error) {
                console.error('Error fetching song details:', error);
                setError(true);
            }
        };

        if (!song || song.key !== key) {
            fetchSong(key);
            const color = listColor[Math.floor(Math.random() * listColor.length)];
            setTheme(color);
        }
        if (artists && artists.length > 0 && artistDetails.length === 0) {
            fetchArtistSong(artists);
        }
    }, [key, song, artists, artistDetails]);
    return (
        <div className="wrapper size-full ">
            <Header bg={theme} />
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
                        <div className="song-detail flex flex-row gap-2 w-full  mb:flex-col mb:items-center mb:justify-center">
                            <div className="thumbnail-container flex items-end ">
                                <img
                                    className="rounded-md max-h-56 aspect-square object-contain shadow-lg shadow-black mb:shadow-full"
                                    src={song.thumbnail}
                                    alt="thumbnail"
                                />
                            </div>
                            <div className="song-infor flex flex-col w-full font-extrabold ps-3 justify-end mb:items-start">
                                <div className="text-sm mb:hidden">{song.type === 'SONG' ? 'Bài hát' : 'PlayList'}</div>
                                <div className=" -ms-1 cursor-default text-xl font-bold mt-2 hidden mb:block">
                                    {song.title}
                                </div>
                                <div
                                    className=" -ms-1 cursor-default text-left mb-5 mb:hidden"
                                    style={{ fontSize: `${song.title.length > 25 ? '3rem' : '4rem'}` }}
                                >
                                    {song.title}
                                </div>

                                <div className="more-info flex flex-row text-sm gap-2 mb:text-md items-center">
                                    <div className="ava-artist">
                                        <img
                                            className="size-8 rounded-full mb:size-5"
                                            src={song.artists[0].imageUrl}
                                            alt=""
                                        />
                                    </div>
                                    <Link to={`/artist/${song.artists[0].shortLink}`}>
                                        <div className="main-artist">{song.artists[0].name}</div>
                                    </Link>
                                    <div className="text-lg0 mb:hidden">∙</div>
                                    <div className="mb:hidden">{song.duration}</div>
                                </div>
                            </div>
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
                    <div className="px-4 mb:hidden">
                        {artists.map((artist) => (
                            <Link
                                to={artist.shortLink && `/artist/${artist.shortLink}`}
                                key={artist.shortLink}
                                className="rounded-md song-container w-full flex flex-row justify-between p-2 pe-4 items-center   hover:bg-transparent"
                            >
                                <Thumbnail item={artist} size="20" mobile={true} />
                            </Link>
                        ))}
                    </div>
                    <div className="recommend ">
                        <div className="title mx-4 px-2 text-2xl font-bold py-4  border-b-2 border-b-dark-gray">
                            Đề xuất
                        </div>
                        {artistDetails[0] !== 'not found' && (
                            <>
                                {artistDetails.map((artist, index) => (
                                    <div key={index} className="song-list-each-artist px-4 py-4 *:py-3">
                                        <div className="text-2xl font-bold">Bài nhạc của {artist.artist.name}</div>
                                        <SongList songList={artist.songNearly.slice(0, 5)} numList={true} />
                                        <button className="more text-sm hover:underline">Xem thêm</button>
                                    </div>
                                ))}

                                {artistDetails.map(
                                    (artist) =>
                                        artist.playlist && (
                                            <div
                                                key={artist.shortLink + 'playlist'}
                                                className="playlist px-4 py-4 *:my-3"
                                            >
                                                <div className="text-2xl font-bold">
                                                    Danh sách nhạc của {artist.artist.name}
                                                </div>

                                                {<TopShow TopShow={artist.playlist.playlist} />}
                                            </div>
                                        ),
                                )}
                            </>
                        )}
                    </div>
                    <MyInfor />
                </div>
            )}
        </div>
    );
}

export default Song;
