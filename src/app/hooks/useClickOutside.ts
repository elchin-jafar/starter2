import { useUpdateEffect } from "./useUpdateEffect";

export const useClickOutside = (
    element: HTMLElement | null,
    action: () => void,
    ignoreSelectors: string[] = [],
): void => {
    useUpdateEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            const target = event.target as HTMLElement;

            const isIgnored = ignoreSelectors.some((selector) =>
                target.closest(selector),
            );

            if (element && !element.contains(target) && !isIgnored) {
                action();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [element, action, ignoreSelectors]);
};
