import { EditorContent } from "@tiptap/react";
import "./style.css";
import type { TextEditorType } from "./text_editor.type";
import { TextEditorVM } from "./text_editor.vm";
import { Toolbar } from "./toolbar";

const TextEditor = ({
    name,
    value,
    onChange,
    isDebounce = false,
    maxChars,
}: TextEditorType) => {
    const { methods, editor, remaining, handlers } = TextEditorVM({
        name,
        value,
        onChange,
        isDebounce,
        maxChars,
    });

    const error = methods.formState.errors[name];

    return (
        <div className="w-full py-8">
            <div
                className={
                    error
                        ? "border border-red-500 rounded-md p-2"
                        : "border border-gray-200 rounded-md p-2"
                }
            >
                {editor && <Toolbar editor={editor} handlers={handlers} />}
                <EditorContent editor={editor} />
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

export default TextEditor;
