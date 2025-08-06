import { useContext } from 'react';
import SongList from '../SongList';
import Thumbnail from '../Thumbnail';
import { StreamContext } from '~/context/Streaming';

function StreamPlaylist() {
    const playList = JSON.parse(localStorage.getItem('playlistShow'));
    const { currentStream } = useContext(StreamContext);
    return (
        <div className="wrapper-playlist flex flex-col gap-8 ">
            <div className="title text-md font-bold">Danh sách chờ</div>
            <div className="currentSong space-y-4">
                <div className="title text-md font-bold ">Đang phát</div>
                <Thumbnail item={currentStream} size={12} />
            </div>
            <div className="playlist space-y-4 -mx-2">
                <div className="title text-md font-bold px-2">Danh sách phát</div>
                <SongList songList={playList.slice(0, 30)} duration={false} />
            </div>
        </div>
    );
}

export default StreamPlaylist;
