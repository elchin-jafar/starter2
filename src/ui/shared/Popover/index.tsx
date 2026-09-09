"use client";
import {
    Popover as HeadlessPopover,
    PopoverButton,
    PopoverPanel,
    Portal,
} from "@headlessui/react";
import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
} from "@floating-ui/react";
import type { PopoverType } from "./popover.type";
import { cn } from "@/app/utils/cn";

const Popover = ({
    button,
    panelClassName = "",
    popoverClassName = "",
    hasPopoverButton = true,
    placement = "bottom-end",
    onClick,
    children,
    hasArrow,
}: PopoverType) => {
    const {
        refs,
        floatingStyles,
        placement: finalPlacement,
    } = useFloating({
        placement,
        strategy: "fixed",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
        whileElementsMounted: (reference, floating, update) =>
            autoUpdate(reference, floating, update, {
                ancestorScroll: true,
                ancestorResize: true,
                elementResize: true,
                animationFrame: true,
            }),
    });

    const [side, align] = finalPlacement.split("-") as [
        "top" | "bottom" | "left" | "right",
        "start" | "end" | undefined,
    ];

    return (
        <HeadlessPopover className={cn("h-full w-fit", popoverClassName)}>
            {({ close }) => (
                <>
                    {hasPopoverButton ? (
                        <PopoverButton
                            ref={refs.setReference}
                            className="size-full"
                            onClick={onClick}
                        >
                            {button}
                        </PopoverButton>
                    ) : (
                        <div ref={refs.setReference}>{button}</div>
                    )}

                    <Portal>
                        <PopoverPanel
                            ref={refs.setFloating}
                            style={floatingStyles}
                            className={cn(
                                "z-[1000] w-fit rounded-3xl bg-white shadow-lg",
                                panelClassName,
                            )}
                        >
                            {hasArrow && (
                                <span
                                    className={cn(
                                        "pointer-events-none absolute block h-3 w-3 rotate-45 bg-[#050B16]",

                                        side === "bottom" &&
                                            "top-0 -translate-y-1/2",
                                        side === "top" &&
                                            "bottom-0 translate-y-1/2",
                                        side === "left" &&
                                            "right-0 translate-x-1/2",
                                        side === "right" &&
                                            "left-0 -translate-x-1/2",

                                        (side === "bottom" || side === "top") &&
                                            (align === "start"
                                                ? "left-4"
                                                : align === "end"
                                                  ? "right-4"
                                                  : "left-1/2 -translate-x-1/2"),

                                        (side === "left" || side === "right") &&
                                            (align === "start"
                                                ? "top-4"
                                                : align === "end"
                                                  ? "bottom-4"
                                                  : "top-1/2 -translate-y-1/2"),
                                    )}
                                />
                            )}
                            {typeof children === "function"
                                ? children({ close })
                                : children}
                        </PopoverPanel>
                    </Portal>
                </>
            )}
        </HeadlessPopover>
    );
};

export default Popover;
