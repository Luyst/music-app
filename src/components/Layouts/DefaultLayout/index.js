import Sidebar from '~/components/Sidebar';
import Footer from '~/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col   h-dvh  ">
            <div className="content-container p-2 grow flex flex-row justify-start gap-2  w-full overflow-hidden ">
                <Sidebar />
                <div className="w-full  bg-secondary-bg rounded-lg px-4 overflow-y-scroll ">
                    <main className="">{children}</main>
                </div>
            </div>
            <Footer songID={''} />
        </div>
    );
}

export default DefaultLayout;
