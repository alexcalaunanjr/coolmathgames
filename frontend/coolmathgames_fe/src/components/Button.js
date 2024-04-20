import React from 'react';

function Button({ color, text, onClick }) {
    return (
        <button
            className={`${color} text-white p-2 rounded-md w-full`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;