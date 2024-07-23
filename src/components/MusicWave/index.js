import './MusicWave.scss';

function MusicWave() {
    return (
        <div className="music-wave relative  w-full h-6 flex flex-row items-end *:w-1/6  justify-around  *:animate-wave *:bg-teal">
            <div className="line delay-200 "></div>
            <div className="line     delay-500s    "></div>
            <div className="line delay-300"></div>
            <div className="line delay-100 "></div>
        </div>
    );
}

export default MusicWave;
