

export type TextEditorType = {
    name: string;
    isDebounce?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    maxChars?: number;

    // optional (istəsən saxla)
    className?: string;
    placeholder?: string;
    disabled?: boolean;
};

export type TextEditorVMType = Pick<
    TextEditorType,
    "value" | "onChange" | "isDebounce" | "name" | "maxChars"
>;
