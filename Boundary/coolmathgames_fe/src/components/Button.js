import React from 'react';

function Button({ color, text, onClick, icon }) {
    return (
        <button
            className={`${color} text-white p-3 rounded-md w-full flex items-center justify-center`}
            onClick={onClick}
        >
            {/* Render the icon if exists */}
            {icon && (
                <span className="mr-2">
                    <svg
                        className="w-6 h-6 text-white dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </span>
            )}
            <div className='truncate'>
                {text}
            </div>
        </button>
    );
}

export default Button;