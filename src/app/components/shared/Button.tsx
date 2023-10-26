import { ButtonTypes } from '@/types/shared.types';
import React from 'react';


const Button = ({ buttonType = "button", children, onClick, buttonClass, disabled }: ButtonTypes) => {
    return (
        <button
            type={buttonType}
            className={`text-white font-medium py-2 px-4 rounded-lg hover:bg-secondary focus:outline-none ${buttonClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;