import React from 'react';

function MenuDrop({ icons = [], options = [], setActive, active, title }) {
    return (
        <div className="flex flex-col w-full">
            {title && <div className="text-xs px-3 py-2 text-light-gray font-extrabold text-nowrap">{title}</div>}
            <div className="flex flex-col w-full hover:*:bg-transparent *:px-3 *:py-2 *:cursor-pointer">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`flex w-full flex-row gap-3 items-center justify-between ${
                            active === option && 'text-teal font-bold'
                        }`}
                        onClick={() => setActive && setActive(option)}
                    >
                        <div className={`flex flex-row gap-2  `}>
                            {icons[index] && <i className={icons[index]}></i>}
                            <div className="text-sm font-medium text-nowrap">{option}</div>
                        </div>
                        {active === option && <i className="bx bx-check ps-2"></i>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuDrop;
