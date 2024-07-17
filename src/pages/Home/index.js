import nct from 'nhaccuatui-api-full';
import { useEffect, useState } from 'react';
import TopShow from './TopShow';

function Home() {
    const [top100, setTop100] = useState([]);
    const [topSong, setTopSong] = useState([]);
    const [newRelease, setNewRelease] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [topic, setTopic] = useState([]);
    const [video, setVideo] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const homeData = await nct.getHome();
                console.log(homeData);

                if (homeData.status === 'success') {
                    setTopSong(homeData.song);
                    setTop100(homeData.top100);
                    setTopic(homeData.topic);
                    setVideo(homeData.video);
                    setTopicEvent(homeData.topicEvent);
                    setNewRelease(homeData.newRelease.song);
                } else {
                    setError('Lỗi dữ liệu.....');
                }
            } catch (error) {
                console.error('Error fetching home data:', error);
            }
        };
        fetchHome();
    }, []);

    return (
        <div className="wrap px-4">
            {error ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <img
                        className="size-52"
                        src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt=""
                    />
                    {error}
                </div>
            ) : (
                <>
                    <TopShow TopShow={newRelease.slice(0, 5)} title="Nhạc mới nè!!" />

                    <TopShow TopShow={top100.slice(0, 5)} title="Top 100" />
                    <TopShow TopShow={topic.slice(0, 5)} title="Chủ đề Hot!" />
                    {topicEvent.map((topicE) => (
                        <TopShow TopShow={topicE.listPlaylist.slice(0, 5)} title={topicE.groupName.split('_')[0]} />
                    ))}
                    <TopShow TopShow={video.slice(0, 4)} title="Video nhạc mới!" />
                </>
            )}
        </div>
    );
}

export default Home;
