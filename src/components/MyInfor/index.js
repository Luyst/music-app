import './MyInfor.scss';
function MyInfor() {
    return (
        <div className="wrapper flex flex-row justify-between mx-2 py-4 px-2 mt-20 border-t-2  border-dark-gray">
            <div className="*:p-1">
                <div>Trang web được clone bởi: Luyst</div>

                <div className=" flex flex-row gap-4 items-center cursor-pointer  *:gap-4 *:ease-in-out *:duration-500 *:rounded-full ">
                    <a
                        href="tel:0905067717"
                        target="__blank"
                        className="phone button-container flex items-center   bg-white w-56"
                    >
                        <i className="bx bxs-phone size-10 p-3 font-bold rounded-full flex items-center justify-center text-xl bg-secondary-color"></i>
                        <span className="flex justify-center span-phone  font-semibold pe-2  text-secondary-color w-32">
                            0905 067 717
                        </span>
                    </a>
                </div>
            </div>
            <div className="contact *:size-10 *:overflow-hidden flex flex-row gap-4 items-center cursor-pointer  *:gap-4 *:ease-in-out *:duration-500 *:bg-secondary-color *:rounded-full hover:*:w-32">
                <a
                    href="https://www.instagram.com/duchuy_lux/"
                    target="__blank"
                    className="instagram button-container flex items-center  group hover:bg-white"
                >
                    <i className="bx bxl-instagram  size-10 p-3 font-bold rounded-full flex items-center justify-center text-xl "></i>
                    <span className=" span-instagram font-semibold pe-2 -ms-3">Instagram</span>
                </a>
                <a
                    href="https://www.facebook.com/profile.php?id=100028388523941"
                    target="__blank"
                    className="facebook button-container flex items-center  group hover:bg-white"
                >
                    <i className="bx bxl-facebook size-10 p-3 font-bold rounded-full flex items-center justify-center text-xl"></i>
                    <span className="span-facebook  font-semibold pe-2 -ms-3">Facebook</span>
                </a>
                <a
                    href="https://github.com/Luyst/music-app"
                    target="__blank"
                    className="github button-container flex items-center  group hover:bg-white "
                >
                    <i className="bx bxl-github  size-10  p-3 font-bold rounded-full flex items-center justify-center text-xl"></i>
                    <span className="span-github  font-semibold pe-2 -ms-2">GitHub</span>
                </a>
            </div>
        </div>
    );
}

export default MyInfor;
