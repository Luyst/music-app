import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StreamContext } from '~/context/Streaming';
import StreamSong from '~/components/StreamSong';
import StreamPlayList from '~/components/StreamPlayList';
import StreamLyric from '~/components/StreamLyric';

function RightSidebar() {
    const display = useContext(StreamContext).rightSidebar;
    return (
        <aside
            className={`flex flex-col p-4 pt-2  min-w-80 bg-secondary-bg  overflow-scroll mb:hidden md:hidden ${
                display === 'hidden' && 'hidden'
            }`}
        >
            {display === 'StreamSong' && <StreamSong />}
            {display === 'PlayList' && <StreamPlayList />}
            {display === 'StreamLyric' && <StreamLyric />}
        </aside>
    );
}

export default RightSidebar;
