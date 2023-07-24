import React, { MouseEvent } from 'react'

type ButtonTypes = {
    buttonType?: 'submit' | 'button' | 'reset';
    children: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ buttonType = "button", children, onClick }: ButtonTypes) => {
    return (
        <button
            type={buttonType}
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button