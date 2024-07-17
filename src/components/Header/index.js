import React from 'react';
import Icons from '../Icons';

function Header() {
    return (
        <header className="wrapper flex flex-row  items-center justify-between pt-4 px-2">
            <div className="location-control flex flex-row text-3xl gap-2 hover:*:text-primary-color ">
                <div className="back-button  cursor-pointer">
                    <i className={Icons.back}></i>
                </div>
                <div className="return-button cursor-pointer">
                    <i className={Icons.return}></i>
                </div>
            </div>

            {/* <div className="search-container  w-6/12  ">
                <form action="" className="w-full flex flex-row overflow-hidden">
                    <input
                        className="rounded-full w-full   border-primary-bg  border-2 p-3 px-4 bg-gray focus:border-primary-color focus:outline-none"
                        name="search-input"
                        id="search-input"
                    />

                    <button className=" rounded-full flex items-center justify-center w-10 text-xl -m-10 hover:text-primary-color">
                        {Icons.search}
                    </button>
                </form>
            </div> */}

            <div className="right-header flex flex-row gap-6 items-center *:rounded-full hover:*:scale-105 *:cursor-pointer hover:*:text-primary-color">
                <div className="install h-10  flex items-center  bg-primary-bg p-4  text-base gap-1 ">
                    {Icons.install}
                    <span> Cài đặt Ứng dụng</span>
                </div>
                <div className="notification bg-primary-bg size-10 flex items-center justify-center text-2xl">
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
