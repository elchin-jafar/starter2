import { cn } from "@/app/utils/cn";
import { Check, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import type { ListFileUploadType } from "./listFileUpload.type";
import { useListFileUploadVM } from "./listFileUpload.vm";

const ListFileUpload = ({
    name,
    value,
    onChange,
    label,
    multiple = false,
    hasView = true,
    showMainImage = false,
    formatDescription,
    disabled,
    ...props
}: ListFileUploadType) => {
    const {
        methods,
        hasMethods,
        files,
        initialList,
        removeInitial,
        errorMsg,
        inputRef,
        dragging,
        mainIndex,
        handleChangeFile,
        handleRemove,
        handlePreview,
        onDragEnter,
        onDragLeave,
        onDrop,
        setAsMain,
    } = useListFileUploadVM({
        name,
        value,
        onChange,
        multiple,
        showMainImage,
        disabled,
    });

    const renderInput = () => (
        <>
            <button
                type="button"
                className={cn(
                    "relative w-full rounded-xl border p-6",
                    "transition-[background-color,border-color,box-shadow] duration-200",
                    dragging
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-950/20"
                        : "border-gray-200 bg-white dark:border-white/10 dark:bg-[#0B1220]",
                    disabled
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/15",
                    errorMsg && "border-red-500 dark:border-red-500",
                )}
                onDragEnter={onDragEnter}
                onDragOver={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="grid size-11 place-items-center rounded-xl bg-[#e2f3ff] dark:bg-white/5">
                        <Upload className="size-5 text-teal-700 dark:text-teal-300" />
                    </div>

                    <div className="text-sm">
                        <span className="font-semibold text-teal-700 dark:text-teal-300">
                            Click to upload
                        </span>{" "}
                        <span className="text-gray-500 dark:text-gray-400">
                            or drag & drop
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {label || "SVG, PNG, JPG, JPEG"}{" "}
                        {formatDescription ? `• ${formatDescription}` : ""}
                    </p>
                </div>

                <input
                    ref={(el) => {
                        inputRef.current = el;
                        // VM-də register edilir, burada təkrar etməyə ehtiyac yoxdur
                        if (hasMethods) methods.register(name);
                    }}
                    disabled={disabled}
                    multiple={multiple}
                    id={name}
                    type="file"
                    onChange={handleChangeFile}
                    className={cn(
                        "absolute inset-0 h-full w-full opacity-0",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                    )}
                    {...props}
                />
            </button>

            {errorMsg && (
                <p role="alert" className="text-error-500 text-14px400 -mt-2">
                    {errorMsg}
                </p>
            )}
        </>
    );

    const renderFileRow = (file: File, index: number) => {
        const url = URL.createObjectURL(file);
        const fileSize = file.size
            ? (file.size / 1024 / 1024).toFixed(2)
            : "0.00";
        const isMain = showMainImage && index === mainIndex;

        return (
            <div
                key={file.name + index}
                className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border p-3",
                    "border-gray-200 bg-white dark:border-white/10 dark:bg-[#0B1220]",
                    "transition-[background-color,border-color] duration-200",
                    "hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/15",
                )}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <img
                        src={url}
                        alt={file.name}
                        className="size-11 rounded-lg object-cover shrink-0"
                        draggable={false}
                    />

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                            {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {fileSize} MB
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    {showMainImage && (
                        <button
                            type="button"
                            onClick={() => setAsMain(index)}
                            className={cn(
                                "text-xs font-medium",
                                isMain
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-gray-500 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300",
                            )}
                        >
                            {isMain ? (
                                <span className="inline-flex items-center gap-1">
                                    Main <Check className="size-4" />
                                </span>
                            ) : (
                                "Set main"
                            )}
                        </button>
                    )}

                    {hasView && (
                        <button
                            type="button"
                            onClick={() => handlePreview(url)}
                            className={cn(
                                "grid size-9 place-items-center rounded-lg",
                                "transition-colors",
                                "hover:bg-[#e2f3ff] dark:hover:bg-white/5",
                            )}
                            aria-label="Preview"
                        >
                            <ImageIcon className="size-5 text-gray-700 dark:text-gray-200" />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className={cn(
                            "grid size-9 place-items-center rounded-lg",
                            "transition-colors",
                            "hover:bg-red-50 dark:hover:bg-red-500/10",
                        )}
                        aria-label="Remove"
                    >
                        <Trash2 className="size-5 text-red-600 dark:text-red-400" />
                    </button>
                </div>
            </div>
        );
    };

    const renderInitialRow = (url: string, i: number) => (
        <div
            key={url + i}
            className={cn(
                "flex items-center justify-between gap-3 rounded-xl border p-3",
                "border-gray-200 bg-white dark:border-white/10 dark:bg-[#0B1220]",
                "transition-[background-color,border-color] duration-200",
                "hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/15",
            )}
        >
            <div className="flex items-center gap-3 min-w-0">
                <img
                    src={url}
                    className="size-11 rounded-lg object-cover shrink-0"
                    draggable={false}
                    alt="Current file"
                />
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        {url.split("/").pop()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Mövcud loqo
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
                {hasView && (
                    <button
                        type="button"
                        onClick={() => handlePreview(url)}
                        className={cn(
                            "grid size-9 place-items-center rounded-lg",
                            "transition-colors",
                            "hover:bg-[#e2f3ff] dark:hover:bg-white/5",
                        )}
                        aria-label="Preview"
                    >
                        <ImageIcon className="size-5 text-gray-700 dark:text-gray-200" />
                    </button>
                )}

                <button
                    type="button"
                    onClick={removeInitial}
                    className={cn(
                        "grid size-9 place-items-center rounded-lg",
                        "transition-colors",
                        "hover:bg-red-50 dark:hover:bg-red-500/10",
                    )}
                    aria-label="Remove"
                >
                    <Trash2 className="size-5 text-red-600 dark:text-red-400" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-3" data-rhf-name={name}>
            {renderInput()}

            {!!files.length && (
                <div className="flex flex-col gap-3">
                    {files.map(renderFileRow)}
                </div>
            )}

            {!files.length && !!initialList.length && (
                <div className="flex flex-col gap-3">
                    {initialList.map(renderInitialRow)}
                </div>
            )}
        </div>
    );
};

export default ListFileUpload;
