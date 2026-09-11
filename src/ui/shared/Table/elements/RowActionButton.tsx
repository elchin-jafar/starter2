import { cn } from "@/app/utils/cn";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { RowActionButtonType } from "../table.type";

export const RowActionButton = ({ variant, onClick }: RowActionButtonType) => {
    const base = cn(
        "cursor-pointer",
        "inline-flex items-center justify-center",
        "size-9 rounded-lg",
        "transition-[background-color,transform,box-shadow] duration-150 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
        "active:scale-95",
        "hover:bg-white/80 dark:hover:bg-gray-950",
        "hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-none",
    );

    if (variant === "view")
        return (
            <button
                className={base}
                type="button"
                aria-label="View"
                onClick={onClick}
            >
                <Eye className="size-5 text-black dark:text-gray-200" />
            </button>
        );

    if (variant === "edit")
        return (
            <button
                className={base}
                type="button"
                aria-label="Edit"
                onClick={onClick}
            >
                <Pencil className="size-5 text-gray-700 dark:text-gray-200" />
            </button>
        );

    return (
        <button
            onClick={onClick}
            className={cn(
                base,
                "hover:bg-red-50 dark:hover:bg-red-950/30",
                "focus-visible:ring-red-400",
            )}
            type="button"
            aria-label="Delete"
        >
            <Trash2 className="size-5 text-red-600" />
        </button>
    );
};
