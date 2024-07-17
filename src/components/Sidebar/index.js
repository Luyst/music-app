import React from 'react';
import { Link } from 'react-router-dom';
import Icons from '../Icons';

function Sidebar() {
    return (
        <aside className="wrapper flex flex-col  h-full w-1/4 gap-2 ">
            <header>
                <ul className="sidebar-header flex flex-col p-4 gap-4 bg-gray rounded-lg h-full">
                    <li>
                        <Link to="/" className="hover:text-primary-color flex flex-row gap-2 items-center">
                            {Icons.home}
                            <span className="text-xl">Trang chủ</span>
                        </Link>
                        <Link to="/" className="hover:text-primary-color flex flex-row gap-2 items-center">
                            {Icons.search}
                            <span className="text-xl">Tìm kiếm</span>
                        </Link>{' '}
                    </li>
                </ul>
            </header>
            <footer className="sidebar-footer flex flex-col bg-gray rounded-lg h-full p-4">
                <header className="flex flex-row justify-between items-center hover:*:text-primary-color cursor-pointer">
                    <div className="title flex flex-row items-center gap-2">
                        {Icons.library}
                        <span className="text-xl">Thư viện</span>
                    </div>
                    <div className="">{Icons.addNew}</div>
                </header>
            </footer>
        </aside>
    );
}

export default Sidebar;
