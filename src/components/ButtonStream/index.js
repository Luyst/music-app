import { useContext } from 'react';
import { StreamContext } from '~/context/Streaming';
import nct from 'nhaccuatui-api-full';

function ButtonStream({ song, size }) {
    const setStream = useContext(StreamContext).setStream;
    const s = size * 4 + 'px';
    const playSong = async (keysong) => {
        console.log(keysong);
        try {
            const fetchStream = await nct.getSong(keysong);
            if (fetchStream.status === 'success') {
                localStorage.setItem('streaming', JSON.stringify(song));
                console.log(song);
                setStream(song);
            }
        } catch (error) {
            console.error('Error fetching song:', error);
        }
    };

    return (
        <div
            key={song.key}
            className={`flex justify-center items-center rounded-full    bg-teal hover:scale-110`}
            style={{ height: s, width: s }}
            onClick={() => playSong(song.key)}
        >
            <i className="bx bx-play text-4xl  "></i>{' '}
        </div>
    );
}

export default ButtonStream;
