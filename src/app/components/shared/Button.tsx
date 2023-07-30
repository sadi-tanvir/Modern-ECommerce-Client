import { ButtonTypes } from '@/types/shared.types'
import React from 'react'

const Button = ({ buttonType = "button", color = "blue", children, onClick, buttonClass }: ButtonTypes) => {
    return (
        <button
            type={buttonType}
            className={`w-full bg-${color}-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-slate-400 focus:outline-none ${buttonClass}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button