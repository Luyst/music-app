import { useState } from 'react';
import { Link } from 'react-router-dom';

function TopShow({ TopShow, title }) {
    const [hidden, setHidden] = useState(true);

    const showAll = () => {
        setHidden(!hidden);
    };

    return (
        <div className={`${title} w-full flex flex-col gap-4 py-4`}>
            <div className="hover:*:text-primary-color hover:*:underline flex justify-between items-center pb-2 pe-4">
                <Link to={`/`}>
                    <div className="text-2xl font-bold">{title}</div>
                </Link>
                <span className="text-sm cursor-pointer" onClick={showAll}>
                    {hidden ? 'Hiện tất cả' : 'Ẩn bớt'}
                </span>
            </div>
            <div
                className={`top-container overflow-hidden w-full grid grid-cols-5 gap-3 ${hidden ? 'h-56' : 'h-auto'}`}
            >
                {TopShow.map((item) => (
                    <Link key={item.key} to={`/${item.type}/${item.key}`}>
                        <div className="card w-52">
                            <div className="thumbnail h-52 overflow-hidden rounded-lg">
                                <img
                                    className="hover:scale-125 ease-in-out duration-700"
                                    src={item.thumbnail ? item.thumbnail : item.thumbURL}
                                    alt={title}
                                    title={item.title}
                                />
                            </div>
                            <div className="title text-sm truncate">{item.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopShow;
