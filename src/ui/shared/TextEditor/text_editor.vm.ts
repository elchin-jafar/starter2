import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { sanitizeHtml } from "@/app/utils/sanitizeHtml";
import { removeTags } from "@/app/utils/removeTags";
import type { TextEditorVMType } from "./text_editor.type";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

const normalizeHtml = (html: string) => {
    const sanitized = sanitizeHtml(html || "");
    const plain = removeTags(sanitized).replace(/\u00A0/g, " ").trim();
    return { sanitized, plain, isEmpty: plain.length === 0 };
};

export const TextEditorVM = ({
    value,
    onChange,
    isDebounce = false,
    name,
    maxChars = 275,
}: TextEditorVMType) => {
    const methods = useFormContext();
    const hasMethods = !!methods?.formState;

    const watched = hasMethods ? ((methods.watch(name) as string) ?? "") : "";
    const externalValue = value ?? watched;

    const [innerValue, setInnerValue] = useState<string>(externalValue || "");
    const [plainLen, setPlainLen] = useState<number>(0);

    const debouncedValue = useDebounce(innerValue, 300, isDebounce);

    useEffect(() => {
        setInnerValue(externalValue || "");
        setPlainLen(normalizeHtml(externalValue || "").plain.length);
    }, [externalValue]);

    const remaining = Math.max(maxChars - plainLen, 0);

    const commitToForm = (html: string) => {
        const { sanitized, isEmpty } = normalizeHtml(html);
        const nextValue = isEmpty ? "" : sanitized;

        if (onChange) return onChange(nextValue);
        if (!hasMethods) return;

        const current = ((methods.getValues(name) as string) ?? "") as string;
        if (current === nextValue) return;

        const shouldValidate = methods.formState.submitCount > 0;

        methods.setValue(name, nextValue, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate,
        });
    };

    useUpdateEffect(() => {
        if (!isDebounce) return;
        commitToForm(debouncedValue);
    }, [debouncedValue]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
        ],
        content: innerValue || "",
        editorProps: {
            attributes: {
                class: "tiptap min-h-[160px] p-3 outline-none max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            const plain = editor.getText().replace(/\u00A0/g, " ").trim();

            if (plain.length > maxChars) {
                editor.commands.undo();
                return;
            }

            const html = editor.getHTML();
            setPlainLen(plain.length);
            setInnerValue(html);

            if (!isDebounce) commitToForm(html);
        },
        onBlur: () => {
            if (!hasMethods) return;
            if (methods.formState.submitCount > 0) methods.trigger(name);
        },
    });

    useEffect(() => {
        if (!editor) return;

        const current = editor.getHTML() || "";
        const next = innerValue || "";

        if (current === next) return;

        editor.commands.setContent(next, { emitUpdate: false });

        const plain = editor.getText().replace(/\u00A0/g, " ").trim();
        setPlainLen(plain.length);
    }, [editor, innerValue]);

    // ✅ Toolbar JS handlers VM-də
    const handlers = useMemo(() => {
        return {
            toggleBold: () => editor?.chain().focus().toggleBold().run(),
            toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
            toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
            toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
            toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
            askLink: () => {
                if (!editor) return;
                const prev = (editor.getAttributes("link")?.href as string) || "";
                const url = window.prompt("Link", prev);
                if (url === null) return;

                const trimmed = url.trim();
                if (!trimmed) {
                    editor.chain().focus().unsetLink().run();
                    return;
                }

                editor.chain().focus().setLink({ href: trimmed }).run();
            },
            clear: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
        };
    }, [editor]);

    return {
        methods,
        hasMethods,
        editor,
        remaining,
        handlers,
    };
};
