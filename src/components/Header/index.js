import Icons from '../Icons';

import { useNavigate } from 'react-router-dom';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
function Header({ notSearch = true }) {
    const nav = useNavigate();
    const onSearchChange = debounce((e) => {
        nav(`/search/${e.target.value}`);
    }, 600);

    return (
        <header className="wrapper flex flex-row  items-center justify-between pt-4 px-2 sticky top-0 bg-secondary-bg pb-2">
            <div className="control flex flex-row text-3xl gap-4 hover:*:text-primary-color items-center *:text-light-gray">
                <div className="back-button cursor-pointer ">
                    <i className={Icons.back}></i>
                </div>
                <div className="return-button cursor-pointer">
                    <i className={Icons.return}></i>
                </div>
                <div
                    className={`w-full flex flex-row overflow-hidden relative group search-container min-w-96 text-sm z-50 
                        ${notSearch && 'hidden'}`}
                >
                    <label
                        htmlFor="search-input"
                        className="rounded-full flex items-center justify-center w-10 text-light-gray 
                        group-focus-within:text-white group-hover:text-white absolute top-2 left-2 cursor-pointer"
                    >
                        <i className="bx bx-search text-2xl"></i>
                    </label>
                    <input
                        onChange={(e) => onSearchChange(e)}
                        className="rounded-full w-full  border-gray border-2 p-3 px-12 group-focus-within:text-white group-hover:text-white
                        bg-[#858585] focus:border-white focus:outline-none font-medium"
                        name="search-input"
                        id="search-input"
                    />
                </div>
            </div>

            <div className="right-header flex flex-row gap-6 items-center *:rounded-full hover:*:scale-105 *:cursor-pointer hover:*:text-white">
                <div className="install h-10  flex items-center  bg-teal p-4  text-base gap-1 ">
                    {Icons.install}
                    <span> Cài đặt Ứng dụng</span>
                </div>
                <div className="notification  bg-teal size-10 flex items-center justify-center text-2xl">
                    {Icons.noti}
                </div>
                <div className="user overflow-hidden size-10  ">
                    <img
                        src="https://avatars.githubusercontent.com/u/114400177?v=4"
                        alt="avatar"
                        className="object-cover"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
