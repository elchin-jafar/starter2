import { type Placement } from "@floating-ui/react";
import { type ReactNode } from "react";

export type PopoverType = {
    button: ReactNode;
    panelClassName?: string;
    popoverClassName?: string;
    placement?: Placement;
    hasPopoverButton?: boolean;
    onClick?: () => void;
    children: ReactNode | ((props: { close: () => void }) => ReactNode);
    hasArrow?: boolean;
};
