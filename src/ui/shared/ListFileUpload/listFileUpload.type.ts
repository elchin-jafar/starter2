import type React from "react";

export type ListFileUploadType = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
> & {
    name: string;
    value?: File | File[] | string | string[] | null;
    onChange?: (v: File | File[] | string | string[] | null) => void;
    label?: string;
    multiple?: boolean;
    hasView?: boolean;
    showMainImage?: boolean;
    formatDescription?: string;
    disabled?: boolean;
};

export type ListFileUploadVMType = Pick<
    ListFileUploadType,
    "name" | "value" | "onChange" | "multiple" | "showMainImage" | "disabled"
>;
