import { ChangeEvent, MouseEvent } from "react";


export type NavItemTypes = {
    path: string;
    children: string;
    navClassName?: string;
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