import nct from 'nhaccuatui-api-full';
import { useEffect, useState } from 'react';
import TopShow from '../../components/TopShow';
import Header from '~/components/Header';

function Home() {
    const [top100, setTop100] = useState([]);
    const [topSong, setTopSong] = useState([]);
    const [newRelease, setNewRelease] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [topic, setTopic] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const homeData = await nct.getHome();

                if (homeData.status === 'success') {
                    setTopSong(homeData.song);
                    setTop100(homeData.top100);
                    setTopic(homeData.topic);
                    setTopicEvent(homeData.topicEvent);
                    setNewRelease(homeData.newRelease.song);
                } else {
                    setError('Lỗi dữ liệu !!');
                }
            } catch (error) {
                console.error('Error fetching home data:', error);
            }
        };
        fetchHome();
    }, []);

    return (
        <div className="wrap px-4 mb:px-2">
            <Header />

            {error ? (
                <div className="w-full flex flex-col text-xl justify-center items-center gap-3">
                    <img
                        className="size-64"
                        src="https://media1.giphy.com/media/1BInwSwDIjVT9esJF9/giphy.gif?cid=6c09b952gq3k5mhafs5gvu3ks1x2dsizpjpyevzb6rayr5ys&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt=""
                    />
                    {error}
                </div>
            ) : (
                <>
                    <div className="hidden mb:flex flex-row py-4 justify-between pe-3">
                        <div className="text-3xl font-bold">Xin chào !</div>
                        <div>
                            <i className="bx bx-cog text-3xl"></i>{' '}
                        </div>
                    </div>
                    <TopShow TopShow={newRelease} title="Nhạc mới nè !!" />
                    <TopShow TopShow={topSong} title="Nhạc hay lắm !!" />
                    {topicEvent.map((topicE, index) => (
                        <TopShow
                            key={index + 'topshowhome'}
                            TopShow={topicE.listPlaylist}
                            title={topicE.groupName.split('_')[0]}
                        />
                    ))}
                    <TopShow TopShow={topic} title="Chủ đề Hot!" />

                    <TopShow TopShow={top100} title="Top 100" />
                </>
            )}
        </div>
    );
}

export default Home;
