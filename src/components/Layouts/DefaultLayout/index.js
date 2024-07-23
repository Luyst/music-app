import Sidebar from '~/components/Sidebar';
import RightSidebar from '~/components/RightSidebar';
import Footer from '~/components/Footer';
import { useContext, useEffect, useRef } from 'react';
import { StreamContext } from '~/context/Streaming';

function DefaultLayout({ children }) {
    const audioRef = useContext(StreamContext).audioRef;

    return (
        <div className="flex flex-col   h-dvh  ">
            <div className="content-container p-2 grow flex flex-row justify-start gap-2  w-full overflow-hidden mb:p-0 ">
                <Sidebar />
                <div className="w-full  bg-secondary-bg rounded-lg  overflow-y-scroll ">
                    <main className="">{children}</main>
                    <div className="mobile  bg-secondary-bg w-full h-40"></div>
                </div>
                <RightSidebar />
            </div>
            <Footer audio={audioRef} />
        </div>
    );
}

export default DefaultLayout;
