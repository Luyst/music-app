import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StreamContext } from '~/context/Streaming';
import Thumbnail from '../Thumbnail';

function StreamSong() {
    const streamSong = useContext(StreamContext).currentStream;
    const setRightSidebar = useContext(StreamContext).setRightSidebar;
    const exitSidebar = () => {
        setRightSidebar('hidden');
    };
    return (
        <div className="h-full w-full flex flex-col gap-4 pb-3 ">
            <div className="pb-4 pt-4 text-md font-bold flex flex-row justify-between">
                <Link to={`/song/${streamSong.key}`} className="hover:underline">
                    {streamSong.title}
                </Link>
                <div className="*:size-8 *:rounded-full hover:*:bg-transparent flex flex-row *:flex *:justify-center *:items-center *:text-2xl *:text-light-gray hover:*:text-white">
                    <div className="setting">
                        <i className="bx bx-dots-horizontal-rounded cursor-pointer"></i>
                    </div>
                    <div onClick={exitSidebar}>
                        <i className="bx bx-x cursor-pointer"></i>
                    </div>
                </div>
            </div>
            <div className="thumbnail">
                <img className="rounded-xl" src={streamSong.thumbnail} alt="" />
            </div>
            <div className="stream-song infor flex flex-row">
                <div className="w-full">
                    <Link to={`/song/${streamSong.key}`} className="text-2xl font-bold hover:underline">
                        {streamSong.title}
                    </Link>
                    <div className="item-artists flex flex-row *:text-light-gray truncate">
                        {streamSong.artists.map((artist, index) => (
                            <div key={artist.name + 'song-stream-title'} className="flex flex-row items-center">
                                <Link
                                    to={`/artist/${artist.shortLink}`}
                                    className="text-sm font-semibold hover:underline"
                                >
                                    {artist.name}
                                </Link>
                                {index < streamSong.artists.length - 1 && <h4 className="me-1 text-xs">,</h4>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="participants-stream p-4 bg-transparent rounded-lg font-bold  ">
                <div className="title flex flex-row justify-between pb-4">
                    <h1 className="">Người tham gia</h1>
                    <button className="text-light-gray underline-hover text-sm">Hiện tất cả</button>
                </div>
                <div className="list flex flex-col gap-4">
                    {streamSong.artists.slice(0, 2).map((artist, index) => (
                        <div className="flex flex-row justify-between" key={artist.name + 'participant'}>
                            <div className="flex flex-col items-start  w-2/3">
                                <Link to={`/artist/${artist.shortLink}`} className="font-semibold hover:underline">
                                    {artist.name}
                                </Link>
                                <div className="text-light-gray text-xs font-medium">Nghệ sĩ trình bày chính</div>
                            </div>
                            <button className="rounded-full bg-secondary-bg px-2 text-sm h-8 w-24 flex items-center justify-center border hover:border-white hover:scale-105 border-light-gray">
                                Theo dõi{' '}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pb-4">
                <div className="next-song p-2 bg-transparent rounded-lg font-bold">
                    <div className="title flex flex-row justify-between pb-1 px-2">
                        <h1 className="">Bài tiếp theo</h1>
                        <button className="text-light-gray underline-hover text-sm">Mở danh sách chờ</button>
                    </div>
                    <div className="flex flex-row items-center hover:bg-transparent rounded-md p-2 group">
                        <i className="bx bx-music pe-3"></i>
                        <Thumbnail item={streamSong} size={12} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StreamSong;
