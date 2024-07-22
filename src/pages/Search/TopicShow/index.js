import { Link } from 'react-router-dom';

function TopicShow({ topic }) {
    return (
        <div className="topic-show grid   gap-6 grid-cols-3 mb:grid-cols-2">
            {topic &&
                topic.map((top) => (
                    <Link
                        to={`/topic/${top.key}`}
                        className="topic-card relative  overflow-hidden aspect-video rounded-xl p-4 mb:text-md"
                        style={{ backgroundColor: top.backgroundColor }}
                    >
                        <div className="flex   w-3/5 text-[2vw] font-bold">{top.title}</div>{' '}
                        <img
                            className="rotate-12 rounded-lg w-5/12 absolute -right-3 aspect-square bottom-0"
                            src={top.thumbURL}
                            alt=""
                        />
                    </Link>
                ))}
        </div>
    );
}

export default TopicShow;
