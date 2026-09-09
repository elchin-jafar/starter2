import type { ReactNode, TextareaHTMLAttributes } from "react";

export type TextareaType = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
> & {
    label?: string;
    name: string;
    placeholder?: string;
    maxLength?: number;
    trailing?: ReactNode;
    isDebounce?: boolean;
    className?: string;
    trailingClassName?: string;
    onChange?: (value: string) => void;
    onDebounce?: (val: string) => void;
};

export type TextAreaVMType = Pick<
    TextareaType,
    "isDebounce" | "onDebounce" | "name" | "onChange" | "maxLength"
>;
