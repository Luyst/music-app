import { useContext } from 'react';
import Icons from '../Icons';
import { Link } from 'react-router-dom';
import PlayBack from '../PlayBack';
import Thumbnail from '../Thumbnail';
import SongNav from '../SongNav';
import { StreamContext } from '~/context/Streaming';

function Footer({ audio }) {
    const currentSong = useContext(StreamContext).currentStream;

    return (
        <footer className="wrap  w-full p-3 mb:p-2 mb:fixed mb:bottom-0 mb:bg-secondary-bg  duration-300 ease-in-out">
            {currentSong && (
                <>
                    <div className="audio-player-control flex flex-row justify-between items-center px-2 h-full w-full mb:h-12 rounded-lg mb:bg-primary-color  mb:px-2  duration-300 ease-in-out ">
                        <div className="w-1/3 mb:w-full">
                            <Thumbnail item={currentSong} size={16} />
                        </div>
                        <div className="w-2/5 mb:hidden ">
                            <PlayBack stream={currentSong} audioRef={audio} />
                        </div>
                        <div className=" w-1/3 mb:hidden ">
                            <SongNav audioRef={audio} />
                        </div>
                    </div>
                    {/* <div className="mobile play-button h-full ">
                            <div
                                className="play-pause-button text-3xl flex  justify-center items-center  h-full cursor-pointer hover:scale-110  "
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? <i className={Icons.pause}></i> : <i className={Icons.play}></i>}
                            </div>
                        </div> */}
                    {/* <div
                        className=" mobile flex flex-row items-center duration-bar h-0.5 w-full bg-gray group   rounded-full   "
                        onClick={handleProgressBarClick}
                    >
                        <div
                            className="progress-bar bg-teal h-full rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div> */}
                </>
            )}

            <div className="nav mobile duration-300 ease-in-out">
                <ul className="sidebar-header flex flex-row p-4 justify-between rounded-lg h-full">
                    <li>
                        <Link to="/" className="hover:text-primary-color flex flex-col gap-2 items-center">
                            {Icons.home}
                            <span className="text-xs">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-primary-color flex flex-col gap-2 items-center">
                            {Icons.search}
                            <span className="text-xs">Tìm kiếm</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-primary-color flex flex-col gap-2 items-center">
                            {Icons.home}
                            <span className="text-xs">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-primary-color flex flex-col gap-2 items-center">
                            {Icons.search}
                            <span className="text-xs">Tìm kiếm</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
