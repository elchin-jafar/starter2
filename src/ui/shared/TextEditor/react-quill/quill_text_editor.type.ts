import type { ComponentProps } from "react";
import type ReactQuill from "react-quill-new";

type ReactQuillProps = ComponentProps<typeof ReactQuill>;

export type QuillTextEditorType = Omit<
    ReactQuillProps,
    "value" | "onChange"
> & {
    name: string;
    isDebounce?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    maxChars?: number;
};

export type QuillTextEditorVMType = Pick<
    QuillTextEditorType,
    "value" | "onChange" | "isDebounce" | "name" | "maxChars"
>;
