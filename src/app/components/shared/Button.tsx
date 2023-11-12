import React, { MouseEvent } from 'react';

export type ButtonTypes = {
    buttonType?: 'submit' | 'button' | 'reset';
    children: string;
    color?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    buttonClass?: string;
    disabled?: boolean;
    boxShadowColor?: string;
}
const Button = ({ buttonType = "button", children, onClick, buttonClass, disabled, boxShadowColor }: ButtonTypes) => {
    return (
        <button
            type={buttonType}
            className={`min-h-[40px] rounded-lg font-bold border-none cursor-pointer active:scale-90 active:translate-x-2 active:translate-y-2 transition-all duration-[70ms] bg-primary ${buttonClass}`}
            style={{ boxShadow: `0 5px 0 0 ${boxShadowColor} ` }}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;