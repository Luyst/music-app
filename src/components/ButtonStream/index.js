import { useContext } from 'react';
import { StreamContext } from '~/context/Streaming';

function ButtonStream({ song, size }) {
    const setSteam = useContext(StreamContext).setStream;
    const onStreamClick = () => {
        localStorage.setItem('streaming', JSON.stringify(song));
        setSteam(song);
    };
    return (
        <div
            key={song.key}
            className={`flex justify-center items-center rounded-full size-${size}   bg-teal hover:scale-110`}
            onClick={onStreamClick}
        >
            <i class="bx bx-play text-4xl   "></i>{' '}
        </div>
    );
}

export default ButtonStream;
