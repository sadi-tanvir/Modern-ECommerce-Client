import { ChangeEvent, MouseEvent } from "react";


export type NavItemTypes = {
    path: string;
    children: string;
    navClassName?: string;
}

export type ButtonTypes = {
    buttonType?: 'submit' | 'button' | 'reset';
    children: string;
    color?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    buttonClass?: string;
}

type SingleSelectOptions = {
    label: string;
    value: string;
};

export type SingleSelectInputProps = {
    options: SingleSelectOptions[];
    name: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentValue?: string;
    labelName?: string;
};

type MultiSelectOption = {
    label: string;
    value: any;
};

export type MultiSelectInputFieldProps = {
    options: MultiSelectOption[];
    value?: {
        id: string;
        name: string;
    };
    name: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentValue?: any;
    labelName?: string;
};

export type TextInputFieldTypes = {
    name?: string;
    labelName?: string;
    inputType?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}