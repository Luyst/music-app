function Tooltip({ children, message }) {
    return (
        <div className="relative group">
            <div className="absolute opacity-0 delay-500 ease-out text-sm -top-1 left-1/2 -translate-x-1/2 -translate-y-full  min-w-20 flex items-center justify-center min-h-6 bg-black shadow-sm bg-opacity-75 shadow-black p-1 rounded-lg group-hover:opacity-100">
                {message}
            </div>
            {children}
        </div>
    );
}

export default Tooltip;
