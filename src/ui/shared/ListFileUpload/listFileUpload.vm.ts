import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ListFileUploadVMType } from "./listFileUpload.type";

export const useListFileUploadVM = ({
    name,
    value,
    onChange,
    multiple = false,
    showMainImage = false,
    disabled,
}: ListFileUploadVMType) => {
    const methods = useFormContext?.();
    const hasMethods = !!methods?.setValue;

    useEffect(() => {
        if (!hasMethods) return;
        methods.register(name);
    }, [hasMethods, name]);

    const watched = hasMethods
        ? (methods.watch(name) as
              | File
              | File[]
              | string
              | string[]
              | null
              | undefined)
        : undefined;

    const src = watched ?? value;

    const initialList = useMemo<string[]>(() => {
        if (!src) return [];
        if (typeof src === "string") return [src];
        if (Array.isArray(src) && src.every((x) => typeof x === "string"))
            return src as string[];
        return [];
    }, [src]);

    const files = useMemo<File[]>(() => {
        if (!src) return [];
        if (src instanceof File) return [src];
        if (Array.isArray(src) && src.every((x) => x instanceof File))
            return src as File[];
        return [];
    }, [src]);

    const setFiles = (nextFiles: File[]) => {
        if (disabled) return;

        const nextValue: File | File[] | null = multiple
            ? nextFiles
            : (nextFiles[0] ?? null);

        if (hasMethods) {
            methods.setValue(name, nextValue, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }

        onChange?.(nextValue);
    };

    const errors = hasMethods ? (methods.formState.errors as any) : null;
    const errorMsg: string | undefined = errors?.[name]?.message;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState(false);
    const [mainIndex, setMainIndex] = useState(0);

    useEffect(() => {
        if (!showMainImage) return;
        if (!files.length) return;
        if (mainIndex >= files.length) setMainIndex(0);
    }, [files.length, showMainImage, mainIndex]);

    const pickFiles = (picked: File[]) => {
        if (!picked.length) return;

        const next = multiple ? [...files, ...picked] : [picked[0]];
        setFiles(next);

        if (showMainImage && !multiple) setMainIndex(0);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        pickFiles(Array.from(e.target.files || []));
    };

    const handleRemove = (idx: number) => {
        const next = files.filter((_, i) => i !== idx);
        setFiles(next);

        if (showMainImage) {
            if (idx === mainIndex) setMainIndex(0);
            else if (idx < mainIndex) setMainIndex((p) => Math.max(0, p - 1));
        }
    };

    const removeInitial = () => {
        if (disabled) return;
        if (hasMethods) {
            methods.setValue(name, null, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
        onChange?.(null);
    };

    const handlePreview = (src: string | File) => {
        const url = typeof src === "string" ? src : URL.createObjectURL(src);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const onDragEnter = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(false);
        pickFiles(Array.from(e.dataTransfer.files || []));
    };

    const setAsMain = (idx: number) => {
        setMainIndex(idx);
        const main = files[idx];
        const rest = files.filter((_, i) => i !== idx);
        setFiles([main, ...rest]);
        setMainIndex(0);
    };

    return {
        methods,
        hasMethods,
        files,
        initialList,
        removeInitial,
        errorMsg,
        inputRef,
        dragging,
        mainIndex,
        setMainIndex,
        handleChangeFile,
        handleRemove,
        handlePreview,
        onDragEnter,
        onDragLeave,
        onDrop,
        setAsMain,
    };
};
