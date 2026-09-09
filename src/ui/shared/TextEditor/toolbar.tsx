import type { Editor } from "@tiptap/react";

export const Toolbar = ({
    editor,
    handlers,
}: {
    editor: Editor;
    handlers: {
        toggleBold: () => void;
        toggleItalic: () => void;
        toggleUnderline: () => void;
        toggleOrderedList: () => void;
        toggleBulletList: () => void;
        askLink: () => void;
        clear: () => void;
    };
}) => {
    const btn = (active: boolean) =>
        `px-2 py-1 rounded-md border text-sm ${active ? "bg-gray-100" : "bg-white"}`;

    return (
        <div className="flex flex-wrap gap-2 border rounded-md p-2 mb-2">
            <button
                type="button"
                className={btn(editor.isActive("bold"))}
                onClick={handlers.toggleBold}
            >
                B
            </button>

            <button
                type="button"
                className={btn(editor.isActive("italic"))}
                onClick={handlers.toggleItalic}
            >
                I
            </button>

            <button
                type="button"
                className={btn(editor.isActive("underline"))}
                onClick={handlers.toggleUnderline}
            >
                U
            </button>

            <button
                type="button"
                className={btn(editor.isActive("link"))}
                onClick={handlers.askLink}
            >
                🔗
            </button>

            <button
                type="button"
                className={btn(editor.isActive("orderedList"))}
                onClick={handlers.toggleOrderedList}
            >
                1.
            </button>

            <button
                type="button"
                className={btn(editor.isActive("bulletList"))}
                onClick={handlers.toggleBulletList}
            >
                •
            </button>

            <button type="button" className={btn(false)} onClick={handlers.clear}>
                Tx
            </button>
        </div>
    );
};
