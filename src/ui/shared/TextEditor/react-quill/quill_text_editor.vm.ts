import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { sanitizeHtml } from "@/app/utils/sanitizeHtml";
import { removeTags } from "@/app/utils/removeTags";
import type ReactQuill from "react-quill-new";
import type { RefObject } from "react";
import type { QuillTextEditorVMType } from "./quill_text_editor.type";

type VMArgs = QuillTextEditorVMType & {
    quillRef: RefObject<ReactQuill | null>;
};

const normalizeQuillHtml = (html: string) => {
    const sanitized = sanitizeHtml(html || "");
    const plain = removeTags(sanitized)
        .replace(/\u00A0/g, " ")
        .trim();
    return { sanitized, plain, isEmpty: plain.length === 0 };
};

export const QuillTextEditorVM = ({
    value,
    onChange,
    isDebounce = false,
    name,
    maxChars = 275,
    quillRef,
}: VMArgs) => {
    const methods = useFormContext();
    const hasMethods = !!methods?.formState;

    const watched = hasMethods ? ((methods.watch(name) as string) ?? "") : "";
    const externalValue = value ?? watched;

    const [innerValue, setInnerValue] = useState<string>(externalValue || "");
    const [plainLen, setPlainLen] = useState<number>(0);

    const debouncedValue = useDebounce(innerValue, 300, isDebounce);

    useEffect(() => {
        setInnerValue(externalValue || "");
        const { plain } = normalizeQuillHtml(externalValue || "");
        setPlainLen(plain.length);
    }, [externalValue]);

    const modules = useMemo(
        () => ({
            toolbar: [
                [
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    { list: "ordered" },
                    { list: "bullet" },
                    { script: "sub" },
                    { script: "super" },
                    "clean",
                ], // toggled buttons
                // [{ 'size': ['small', false, 'large', 'huge'] }],
                // [{ 'font': [] }],
                [],
            ],
            clipboard: { matchVisual: false },
        }),
        [],
    );

    const remaining = Math.max(maxChars - plainLen, 0);

    const commitToForm = (html: string) => {
        const { sanitized, isEmpty } = normalizeQuillHtml(html);

        if (onChange) {
            onChange(isEmpty ? "" : sanitized);
            return;
        }

        if (!hasMethods) return;

        const nextValue = isEmpty ? "" : sanitized;
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

    const handleChange = (content: string) => {
        const quill = quillRef.current?.getEditor?.();
        if (!quill) {
            const { plain } = normalizeQuillHtml(content);
            if (plain.length > maxChars) return;
            setPlainLen(plain.length);
            setInnerValue(content);
            if (!isDebounce) commitToForm(content);
            return;
        }

        const len = Math.max(quill.getLength() - 1, 0);

        if (len > maxChars) {
            quill.deleteText(maxChars, len - maxChars, "user");
            const fixedHtml = quill.root?.innerHTML ?? "";
            setInnerValue(fixedHtml);
            setPlainLen(maxChars);

            if (!isDebounce) commitToForm(fixedHtml);
            return;
        }

        setPlainLen(len);
        const html = quill.root?.innerHTML ?? content;

        setInnerValue(html);
        if (!isDebounce) commitToForm(html);
    };

    const handleBlur = () => {
        if (!hasMethods) return;
        if (methods.formState.submitCount > 0) methods.trigger(name);
    };

    return {
        methods,
        hasMethods,
        innerValue,
        modules,
        remaining,
        handleChange,
        handleBlur,
    };
};
