import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../Icons';
import { useLocation } from 'react-router-dom';
import { UserContext } from '~/context/UserProvider';
import MenuDrop from './MenuDrop';
import { serverTimestamp } from 'firebase/firestore';

function Sidebar() {
    const { user } = useContext(UserContext);
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('');
    const [sort, setSort] = useState('Gần đây');
    const [typeOfShow, setTypeOfShow] = useState('Danh sách');
    const [dropdown, setDropdown] = useState(false);

    const shows = ['Danh sách', 'Rút gọn', 'Lưới'];
    useEffect(() => {
        const page = location.pathname.split('/')[1];
        setActive(page);
    }, [location]);

    return (
        <aside
            className={`wrapper flex flex-col  h-full ${
                isOpen ? 'min-w-72 max-w-80' : 'w-18 items-center'
            } gap-2 mb:hidden `}
        >
            <header className="w-full">
                <ul className="sidebar-header flex flex-col py-4 px-5 gap-4 bg-secondary-bg rounded-lg h-full">
                    <li>
                        <Link
                            to="/"
                            className={`hover:text-white ease-in-out duration-700 flex flex-row gap-2 items-center first:text-3xl text-light-gray ${
                                active === '' && 'text-white'
                            }`}
                        >
                            {active === '' ? (
                                <i className="bx bxs-home-alt-2"></i>
                            ) : (
                                <i className="bx bx-home-alt-2"></i>
                            )}
                            <span className={`text-lg font-semibold ${isOpen ? '' : 'hidden'}`}>Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        {' '}
                        <Link
                            to="/search"
                            className={`hover:text-white ease-in-out duration-700 flex flex-row gap-2 items-center first:text-3xl text-light-gray ${
                                active === 'search' && 'text-white'
                            }`}
                        >
                            {active === 'search' ? <i className="bx bxs-search"></i> : <i className="bx bx-search"></i>}
                            <span className={`text-lg font-semibold ${isOpen ? '' : 'hidden'}`}>Tìm kiếm</span>
                        </Link>{' '}
                    </li>
                </ul>
            </header>
            <footer className="sidebar-footer flex flex-col w-full gap-3 bg-secondary-bg rounded-lg h-full py-4 overflow-scroll">
                <header className="flex flex-row justify-between items-center px-5 hover:*:text-teal cursor-pointer">
                    <div className="title flex flex-row items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <i class="bx bxs-book-content text-3xl"></i>
                        ) : (
                            <i className="bx bx-book-content text-3xl"></i>
                        )}{' '}
                        <span className={`text-lg font-semibold ${isOpen ? '' : 'hidden'}`}>Thư viện</span>
                    </div>
                    <div className={`${isOpen ? '' : 'hidden'}`}>
                        <i className="bx bx-plus text-xl"></i>
                    </div>
                </header>
                {user && user.playlistSaved && (
                    <main
                        className={`playlist-saved flex flex-col w-full max-w-72 ${isOpen ? 'px-3.5' : 'items-center'}`}
                    >
                        <div className={`nav flex flex-row justify-between p-1.5 ${isOpen ? '' : 'hidden'}`}>
                            <button>
                                <i className="bx bx-search text-xl"></i>
                            </button>
                            <div className="flex flex-row relative  items-center text-light-gray gap-2 text-xl group">
                                <div
                                    className="flex flex-row items-center text-light-gray gap-2 text-xl hover:text-white hover:scale-105 cursor-pointer"
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    <div className="text-sm font-semibold">Danh sách</div>
                                    {typeOfShow === shows[0] && <i className="bx bx-list-ul"></i>}
                                    {typeOfShow === shows[1] && <i className="bx bx-menu"></i>}
                                    {typeOfShow === shows[2] && <i className="bx bx-grid-alt"></i>}
                                </div>
                                <div
                                    className={`absolute dropdown p-1 bottom-0 z-50 translate-y-full right-0 min-w-44
                                        text-white bg-[#282828] rounded-lg gap-2 divide-y divide-dark-gray ${
                                            dropdown ? 'flex flex-col' : 'hidden'
                                        }`}
                                >
                                    <MenuDrop
                                        title={'Sắp xếp theo'}
                                        options={['Gần đây', 'Thêm gần đây', 'Thứ tự chữ cái', 'Nhà sáng tạo']}
                                        setActive={setSort}
                                        active={sort}
                                    />
                                    <MenuDrop
                                        title={'Xem dưới dạng'}
                                        options={['Danh sách', 'Rút gọn', 'Lưới']}
                                        icons={['bx bx-list-ul', 'bx bx-menu', 'bx bx-grid-alt']}
                                        setActive={setTypeOfShow}
                                        active={typeOfShow}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`content-container ${
                                typeOfShow === shows[2] ? 'grid grid-cols-1' : 'flex flex-col'
                            }`}
                        >
                            {user.playlistSaved.map((playlist, index) =>
                                typeOfShow === shows[0] ? (
                                    <Link
                                        to={`/playlist/${playlist.key}`}
                                        key={index}
                                        className={`p-1.5 flex flex-row gap-2 rounded-lg cursor-pointer
                                                    ${isOpen ? 'h-16 w-full' : 'size-16'} hover:bg-transparent`}
                                    >
                                        <img
                                            className="aspect-square h-full rounded-md"
                                            src={playlist.thumbnail}
                                            alt={playlist.title}
                                        />
                                        <div
                                            className={`flex flex-col w-full overflow-hidden ${isOpen ? '' : 'hidden'}`}
                                        >
                                            <div className="text-md truncate w-full">{playlist.title}</div>
                                            <div className="flex flex-row gap-1 text-light-gray text-sm font-semibold truncate">
                                                <div>Danh sách phát</div>
                                                <div>·</div>
                                                <div className="truncate">{playlist.uploadBy}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ) : typeOfShow === shows[1] ? (
                                    <Link
                                        to={`/playlist/${playlist.key}`}
                                        key={index}
                                        className={`p-1.5 flex flex-row gap-2 rounded-lg cursor-pointer
                                                ${isOpen ? 'w-full' : 'size-16'} hover:bg-transparent`}
                                    >
                                        <img
                                            className={`aspect-square h-full rounded-md ${isOpen ? 'hidden' : ''}`}
                                            src={playlist.thumbnail}
                                            alt={playlist.title}
                                        />
                                        <div
                                            className={`flex flex-row  w-full overflow-hidden ${
                                                isOpen ? '' : 'hidden'
                                            }`}
                                        >
                                            <div className="text-md truncate flex-1">{playlist.title}</div>
                                            <div>·</div>

                                            <div className="truncate flex-1">Danh sách phát</div>
                                        </div>
                                    </Link>
                                ) : (
                                    typeOfShow === shows[2] && (
                                        <Link
                                            to={`/playlist/${playlist.key}`}
                                            key={index}
                                            className={`p-1.5 gap-2 h-full g rounded-lg cursor-pointer
                                                ${isOpen ? 'h-16 w-full' : 'size-16'} hover:bg-transparent`}
                                        >
                                            <img
                                                className="aspect-square h-full rounded-md"
                                                src={playlist.thumbnail}
                                                alt={playlist.title}
                                            />
                                            {/* <div
                                                className={`flex flex-col w-full overflow-hidden ${isOpen ? '' : 'hidden'}`}
                                            >
                                                <div className="text-md truncate w-full">{playlist.title}</div>
                                                <div className="flex flex-row gap-1 text-light-gray text-sm font-semibold truncate">
                                                    <div>Danh sách phát</div>
                                                    <div>·</div>
                                                    <div className="truncate">{playlist.uploadBy}</div>
                                                </div>
                                            </div> */}
                                        </Link>
                                    )
                                ),
                            )}
                        </div>
                    </main>
                )}
            </footer>
        </aside>
    );
}

export default Sidebar;
