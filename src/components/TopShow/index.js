import { useState } from 'react';
import { Link } from 'react-router-dom';

function TopShow({ TopShow, title }) {
    const [hidden, setHidden] = useState(true);

    return (
        <div className={`${title} w-full flex flex-col pb-2 mb-3 `}>
            <div className="hover:*:text-primary-color hover:*:underline flex justify-between items-center ">
                <Link to={`/`}>
                    <div className="text-2xl font-bold mb:text-xl">{title}</div>
                </Link>
            </div>
            <div
                className={`top-container  flex flex-row justify-start overflow-scroll  scroll-smooth  ${
                    hidden ? '' : 'h-auto'
                }`}
            >
                {TopShow.map((item) => (
                    <Link key={item.key} to={`/${item.type ? item.type.toLowerCase() : 'topic'}/${item.key}`}>
                        <div className="flex flex-col gap-2 p-4 rounded-lg card w-full  snap-center  hover:bg-transparent group mb:p-2">
                            <div className="  thumbnail overflow-hidden rounded-lg relative group size-40  ">
                                <img
                                    className="hover:scale-125 ease-in-out duration-700  object-contain w-full"
                                    src={
                                        item.thumbnail ||
                                        item.thumbURL ||
                                        'https://www.shutterstock.com/image-vector/error-500-page-empty-symbol-260nw-1711106146.jpg'
                                    }
                                    alt={title}
                                    title={item.title}
                                />
                                <div
                                    className=" flex justify-center items-center absolute right-3 bottom-3 size-12 translate-y-28  group-hover:translate-y-0 
                    duration-500 ease-in-out rounded-full bg-teal hover:scale-110"
                                >
                                    <i class="bx bx-play text-4xl   "></i>
                                </div>
                            </div>
                            <div className="title text-sm truncate w-40">{item.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopShow;
