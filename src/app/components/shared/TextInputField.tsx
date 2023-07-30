'use client'
import { TextInputFieldTypes } from '@/types/shared.types'
import React from 'react'


const TextInputField = ({ name, labelName, inputType = "text", placeholder, value, isRequired = false, onChange }: TextInputFieldTypes) => {
    return (
        <div className="mb-4">
            {labelName &&
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{labelName}</label>
            }
            <input
                type={inputType}
                name={name}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={placeholder}
                value={value}
                required={isRequired}
                onChange={onChange}
            />
        </div>
    )
}

export default TextInputField