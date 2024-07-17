import { Link } from 'react-router-dom';

function TopShow({ TopShow, title }) {
    return (
        <div className={`${title} w-full flex flex-col gap-4 py-4`}>
            <div className="text-2xl font-bold flex justify-between items-center pb-2">
                {title}
                <Link className="hover:text-primary-color">
                    <span className="text-sm">Hiện tất cả</span>
                </Link>
            </div>
            <div className="top-container overflow-hidden w-full flex flex-row justify-between  ">
                {TopShow.map((item) => (
                    <Link>
                        <div className="card w-52">
                            <div className="thumbnail h-52 overflow-hidden rounded-lg">
                                <img
                                    src={item.thumbnail ? item.thumbnail : item.thumbURL}
                                    alt={title}
                                    title={item.title}
                                />
                            </div>
                            <div className="title text-sm truncate ">{item.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopShow;
