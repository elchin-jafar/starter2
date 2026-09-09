import type { ReactNode, InputHTMLAttributes } from "react";

//TODO: if onDebounce works isDebounce required

export type MaskPatternType = {
    [key: string]: RegExp;
};

export type InputType = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "pattern"
> & {
    label?: string;
    placeholder?: string;
    leading?: ReactNode;
    trailing?: ReactNode;
    name: string;
    type?: string;
    mask?: string;
    pattern?: MaskPatternType;
    isDebounce?: boolean;
    inputClassName?: string;
    wrapperClassName?: string;
    showErrorText?: boolean;
    onChange?: (value: string) => void;
    onDebounce?: (value: string) => void;
};

export type InputVMType = Pick<
    InputType,
    | "name"
    | "type"
    | "mask"
    | "pattern"
    | "isDebounce"
    | "onDebounce"
    | "onChange"
>;
