import Sidebar from '~/components/Sidebar';
import Footer from '~/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col   h-dvh  ">
            <div className="content-container p-2 grow flex flex-row justify-start gap-2  w-full overflow-hidden mb:p-0 ">
                <Sidebar />
                <div className="w-full  bg-secondary-bg rounded-lg  overflow-y-scroll mb:p-1">
                    <main className="">{children}</main>
                    <div className="mobile  bg-secondary-bg w-full h-40"></div>
                </div>
            </div>
            <Footer songID={''} />
        </div>
    );
}

export default DefaultLayout;
