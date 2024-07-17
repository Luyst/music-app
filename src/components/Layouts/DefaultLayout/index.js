import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className="flex flex-col   h-dvh  divide-gray ">
            <div className="content-container p-2 grow flex flex-row justify-start gap-2  w-full overflow-hidden ">
                <Sidebar />
                <div className="w-full  bg-gray rounded-lg px-4 overflow-y-scroll ">
                    <Header />
                    <main className="">{children}</main>
                </div>
            </div>
            <Footer songID={'cr5hwG1ADPUS'} />
        </div>
    );
}

export default DefaultLayout;
