import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../Icons';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    let location = useLocation();
    const [active, setActive] = useState('');
    useEffect(() => {
        const page = location.pathname.split('/')[1];
        setActive(page);
    }, [location]);

    return (
        <aside className="wrapper flex flex-col  h-full w-1/4 gap-2 mb:hidden ">
            <header>
                <ul className="sidebar-header flex flex-col p-4 gap-4 bg-secondary-bg rounded-lg h-full">
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
                            <span className="text-lg font-semibold">Trang chủ</span>
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
                            <span className="text-lg font-semibold">Tìm kiếm</span>
                        </Link>{' '}
                    </li>
                </ul>
            </header>
            <footer className="sidebar-footer flex flex-col bg-secondary-bg  rounded-lg h-full p-4">
                <header className="flex flex-row justify-between items-center hover:*:text-primary-color cursor-pointer">
                    <div className="title flex flex-row items-center gap-2">
                        {Icons.library}
                        <span className="text-lg font-semibold">Thư viện</span>
                    </div>
                    <div className="">{Icons.addNew}</div>
                </header>
            </footer>
        </aside>
    );
}

export default Sidebar;
