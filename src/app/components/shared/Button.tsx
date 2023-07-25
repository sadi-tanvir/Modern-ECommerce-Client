import React, { MouseEvent } from 'react'

type ButtonTypes = {
    buttonType?: 'submit' | 'button' | 'reset';
    children: string;
    color?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    buttonClass?: string;
}

const Button = ({ buttonType = "button", color = "blue", children, onClick, buttonClass }: ButtonTypes) => {
    return (
        <button
            type={buttonType}
            className={`w-full bg-${color}-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none ${buttonClass}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button