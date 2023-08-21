import { MultiSelectInputFieldProps } from '@/types/shared.types';
import React from 'react';
import { DownArrowIcon } from './Icon';



const MultiSelectInputField: React.FC<MultiSelectInputFieldProps> = ({ options, name, value, currentValue, onChange, labelName }) => {
    return (
        <div className="relative pb-5">
            {labelName && <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{labelName}</label>}
            <select
                value={JSON.stringify(value)}
                onChange={onChange}
                name={name}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                {currentValue || <option disabled selected>Pick one</option>}
                {options?.map((option, index) => (
                    <option key={index} value={JSON.stringify(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <DownArrowIcon />
            </div>
        </div>
    );
};

export default MultiSelectInputField;
