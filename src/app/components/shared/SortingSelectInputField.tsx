import React, { ChangeEvent } from 'react';
import { DownArrowIcon } from './Icon';

type SingleSelectOptions = {
    label: string;
    value: string | number;
};

export type SingleSelectInputProps = {
    options: SingleSelectOptions[];
    value?: string;
    name?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    labelName?: string;
    inputClassName?: string;
};

const SortingSelectInputField: React.FC<SingleSelectInputProps> = ({ options, name, value, onChange, labelName, inputClassName }) => {
    return (
        <div className={`${inputClassName} relative`}>
            {/* {labelName && <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{labelName}</label>} */}
            <select
                value={value}
                onChange={onChange}
                name={name}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                <option value="" selected={value == ''}>{labelName}</option>
                {options?.map((option) => (
                    <option selected={value == option.value} key={option.value} value={option.value} >
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-5">
                <DownArrowIcon />
            </div>
        </div>
    );
};

export default SortingSelectInputField;
