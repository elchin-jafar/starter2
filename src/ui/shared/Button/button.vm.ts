import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import React, { useCallback } from "react";
import { cn } from "@/app/utils/cn";

export const ButtonVM = () => {
    const variants: Record<ButtonVariantsEnum, string> = {
        [ButtonVariantsEnum.FILLED]: cn(
            "bg-teal-600 text-white border-none",
            "hover:bg-teal-800",
            "disabled:bg-gray-100 disabled:text-gray-400",
            "dark:disabled:bg-white/10 dark:disabled:text-white/40",
        ),

        [ButtonVariantsEnum.EMPTY]: cn(
            "bg-white text-gray-950 border border-gray-300",
            "hover:bg-gray-50",
            "disabled:text-gray-400",
            "dark:bg-white/5 dark:text-white dark:border-white/12",
            "dark:hover:bg-white/10",
            "dark:disabled:text-white/35 dark:disabled:bg-white/5",
            "[&_.spinner]:dark:border-white",
        ),

        [ButtonVariantsEnum.OUTLINED]: cn(
            "bg-teal-50 text-teal-700 border-none",
            "hover:bg-teal-100",
            "disabled:bg-gray-100 disabled:text-gray-400",
            "dark:bg-white/5 dark:text-teal-200 dark:border dark:border-white/12",
            "dark:hover:bg-white/10",
            "dark:disabled:bg-white/5 dark:disabled:text-white/35",
            "[&_.spinner]:dark:border-teal-200",
        ),

        [ButtonVariantsEnum.ERROR]: cn(
            "bg-error-50 text-error-600 border-none",
            "hover:bg-error-100",
            "dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15",
        ),

        [ButtonVariantsEnum.BACK]: cn(
            "bg-warning-50 text-warning-600 border-none",
            "hover:bg-warning-100",
            "disabled:bg-warning-50 disabled:border-warning-50 disabled:text-warning-300",
            "dark:bg-yellow-500/10 dark:text-yellow-300 dark:hover:bg-yellow-500/15",
            "dark:disabled:bg-yellow-500/8 dark:disabled:text-yellow-300/40",
        ),

        [ButtonVariantsEnum.DANGER]: cn(
            "bg-error-600 text-white border-none",
            "hover:bg-error-500",
            "disabled:bg-error-200",
            "dark:disabled:bg-red-500/25",
        ),
        [ButtonVariantsEnum.CHECK]: cn(
            "bg-teal-50 transition-all text-teal-700",
            "hover:bg-teal-100 hover:text-teal-800",
            "dark:bg-white/5 dark:text-teal-200 dark:hover:bg-white/10",
        ),

        [ButtonVariantsEnum.GRAY]: cn(
            "bg-gray-100 border-none hover:bg-gray-200 text-gray-900",
            "dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10",
        ),

        [ButtonVariantsEnum.WARNING]: cn(
            "bg-warning-50 text-warning-600 border-none hover:bg-warning-100",
            "dark:bg-yellow-500/10 dark:text-yellow-300 dark:hover:bg-yellow-500/15",
        ),
    };

    const rippleEffect = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientX - rect.left;
            const circle = document.createElement("span");
            const diameter = Math.max(
                e.currentTarget.clientWidth,
                e.currentTarget.clientHeight,
            );

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = x + "px";
            circle.style.top = y + "px";
            e.currentTarget.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600);
        },
        [],
    );

    return { variants, rippleEffect };
};
