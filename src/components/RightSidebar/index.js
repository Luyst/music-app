import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="flex flex-col ps-6 pt-2 min-w-40 bg-secondary-bg">
            <Link to="/" className=" flex flex-row logo-container pb-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    viewBox="0 0 24 24"
                    style={{ fill: 'rgba(255,255,255, 1)' }}
                >
                    <path d="M17.68 5.47H22V8h-4.32zM17.68 8.98H22v2.53h-4.32zM17.68 12.49H22v2.53h-4.32zM2 16h4.32v2.53H2zM7.22 16h4.32v2.53H7.22zM12.45 16h4.32v2.53h-4.32zM17.68 16H22v2.53h-4.32zM12.45 12.49h4.32v2.53h-4.32zM7.22 12.49h4.32v2.53H7.22zM7.22 8.98h4.32v2.53H7.22z"></path>
                </svg>
            </Link>

            <nav className="flex flex-col ">
                <ul>
                    <li>Trang chu</li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
