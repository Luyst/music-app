import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import nct from 'nhaccuatui-api-full';

import Header from '~/components/Header';
import SongList from '~/components/SongList';
import ButtonStream from '~/components/ButtonStream';
import Thumbnail from '~/components/Thumbnail';
import TopShow from '~/components/TopShow';
import MyInfor from '~/components/MyInfor';
const listColor = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5'];

function Song() {
    const { key } = useParams();
    const [song, setSong] = useState();
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(true);
    const [theme, setTheme] = useState('');
    const [artistDetails, setArtistDetails] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setArtistDetails(filteredDetails);
                if (filteredDetails[0].status === 'success') {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching artist details:', error);
            }
        };
        const fetchTrendingArtists = async () => {
            try {
                const artistDetails = await nct.explore({
                    type: 'song', // or "playlist" or "mv"
                });

                console.log(artistDetails);
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
                } else {
                    setError(true);
                }
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
        fetchTrendingArtists();
    }, [key, song, artists, artistDetails]);
    return (
        <div className="wrapper size-full ">
            <Header />
            {error ? (
                <div className="w-full flex flex-col text-xl justify-center items-center gap-3">
                    <img
                        className="size-64"
                        src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt=""
                    />
                </div>
            ) : loading ? (
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
            ) : (
                <div className="song-page flex flex-col gap-4">
                    <div className={`background-cover  flex flex-row items-end  p-4 pt-20 ${theme} `}>
                        <div className="song-detail flex flex-row gap-2 z-10">
                            <div className="thumbnail-container flex items-end">
                                <img className="rounded-md size-48" src={song.thumbnail} alt="thumbnail" />
                            </div>
                            <div className="song-infor flex flex-col font-extrabold ps-3 justify-end">
                                <div className="text-sm">{song.type === 'SONG' ? 'Bài hát' : 'PlayList'}</div>
                                <div className="text-8xl -ms-1 cursor-default text-left mb-5">{song.title}</div>
                                <div className="more-info flex flex-row text-sm gap-2 items-center">
                                    <div className="ava-artist">
                                        <img className="size-8 rounded-full" src={song.artists[0].imageUrl} alt="" />
                                    </div>
                                    <Link to={`/artist/${song.artists[0].shortLink}`}>
                                        <div className="main-artist">{song.artists[0].name}</div>
                                    </Link>
                                    <div className="text-lg">∙</div>
                                    <div>{song.duration}</div>
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
                    <div className="px-4 ">
                        {artists.map((artist) => (
                            <Link
                                to={`/artist/${artist.shortLink}`}
                                key={song.key}
                                className="rounded-md song-container w-full flex flex-row justify-between p-2 pe-4 items-center   hover:bg-transparent"
                            >
                                <Thumbnail item={artist} size="20" />
                            </Link>
                        ))}
                    </div>
                    <div className="recommend ">
                        <div className="title mx-4 px-2 text-2xl font-bold py-4  border-b-2 border-b-dark-gray">
                            Đề xuất
                        </div>
                        {artistDetails.length !== 0 && (
                            <>
                                {artistDetails.map((artist, index) => (
                                    <div key={index} className="song-list-each-artist px-4 py-4 *:my-3">
                                        <div className="text-2xl font-bold">Bài nhạc của {artist.artist.name}</div>
                                        <SongList songList={artist.songNearly.slice(0, 5)} numList={true} />
                                        <button className="more text-sm hover:underline">Xem thêm</button>
                                    </div>
                                ))}

                                {artistDetails.map((artist, index) => (
                                    <div key={artist.playlist.playlist.key} className="playlist px-4 py-4 *:my-3">
                                        <div className="text-2xl font-bold">
                                            Danh sách nhạc của {artist.artist.name}
                                        </div>

                                        <TopShow TopShow={artist.playlist.playlist.slice(0, 8)} />
                                    </div>
                                ))}
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
