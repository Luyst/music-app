import React, { useContext } from 'react';
import Icons from '../Icons';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/UserProvider';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { serverTimestamp, addDoc } from 'firebase/firestore';
import { addDocument } from '~/services/service';

function Header({ notSearch = true, mobilePage = String, bg }) {
    const nav = useNavigate();
    const { user } = useContext(UserContext);
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
    const onSearchChange = debounce((e) => {
        nav(`/search/${e.target.value}`);
    }, 700);

    const handleBack = () => {
        nav(-1);
    };
    const handleForward = () => {
        nav(1);
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(result);
            const { displayName, email, photoURL, uid } = result.user;

            if (additionalUserInfo.isNewUser) {
                try {
                    await addDocument('user', { displayName, email, photoURL, uid, createdAt: serverTimestamp() });
                } catch (error) {
                    console.error('Error adding document: ', error);
                }
            }
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };
    return (
        <React.Fragment>
            <header
                className={`wrapper flex flex-row  items-center justify-between sticky pt-4 px-2 top-0 z-50 w-full  
                 ${bg ? 'header-' + bg : 'bg-black '}   pb-2 mb:hidden`}
            >
                <div className="control flex flex-row text-3xl gap-4  items-center *:text-light-gray">
                    <div
                        className={`back-button bg-transparent aspect-square size-8 rounded-full flex justify-center items-center cursor-pointer `}
                        onClick={handleBack}
                    >
                        <i className={Icons.back}></i>
                    </div>
                    <div
                        className="forward-button bg-transparent aspect-square size-8 rounded-full flex justify-center items-center cursor-pointer"
                        onClick={handleForward}
                    >
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
                            className="rounded-full w-full  border-black border-2 p-3 px-12 group-focus-within:text-white group-hover:text-white
                        bg-primary-color focus:border-white focus:outline-none font-medium"
                            name="search-input"
                            id="search-input"
                        />
                    </div>
                </div>

                <div className="right-header flex flex-row gap-6 items-center *:rounded-full hover:*:scale-105 *:cursor-pointer hover:*:text-white">
                    {user ? (
                        <React.Fragment>
                            <div className="install h-10  flex items-center  bg-primary-color p-4  text-base gap-1 ">
                                {Icons.install}
                                <span> Cài đặt Ứng dụng</span>
                            </div>
                            <div className="notification  bg-primary-color size-10 flex items-center justify-center text-2xl">
                                {Icons.noti}
                            </div>
                            <div className="user overflow-hidden size-10  ">
                                <img src={user.photoURL} alt="avatar" className="object-cover" />
                            </div>
                        </React.Fragment>
                    ) : (
                        <div>
                            <div
                                className="h-10 p-4 rounded-full flex items-center font-bold gap-1 bg-white  text-black hover:text-white hover:bg-primary-color duration-300 ease-in-out"
                                onClick={handleGoogleLogin}
                            >
                                Đăng nhập bằng Google
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <header className="mobile  top-0 h-16 w-full flex-row fixed items-center justify-between px-4">
                <div className="goback-button">
                    <i class="bx bx-chevron-left text-4xl aspect-square rounded-full z-50 "></i>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;
