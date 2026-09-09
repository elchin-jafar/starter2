import { useRef } from "react";
import { get } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { QuillTextEditorType } from "./quill_text_editor.type";
import { QuillTextEditorVM } from "./quill_text_editor.vm";
import "./style.css";

const QuillTextEditor = ({
    name,
    value,
    onChange,
    isDebounce = false,
    maxChars,
    ...props
}: QuillTextEditorType) => {
    const quillRef = useRef<ReactQuill | null>(null);

    const {
        methods,
        innerValue,
        handleBlur,
        handleChange,
        modules,
        remaining,
    } = QuillTextEditorVM({
        value,
        onChange,
        isDebounce,
        name,
        maxChars,
        quillRef,
    });
    const error = get(methods.formState.errors, name);

    return (
        <div className="w-full">
            <div
                className={
                    error ? "quill-wrapper quill-error" : "quill-wrapper"
                }
            >
                <ReactQuill
                    ref={quillRef}
                    id={name}
                    theme="snow"
                    value={innerValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    modules={modules}
                    {...props}
                />
            </div>

            {error && (
                <span role="alert" className="text-error-500 text-14px400">
                    {error!.message as string}
                </span>
            )}

            <p className="text-14px500 text-gray-600 mt-[6px]">
                {remaining} simvol qalıb
            </p>
        </div>
    );
};

export default QuillTextEditor;
