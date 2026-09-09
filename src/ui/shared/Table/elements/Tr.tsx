import { cn } from "@/app/utils/cn";
import type { TableRowType } from "../table.type";

export const TR = ({ children, className, ...props }: TableRowType) => {
    return (
        <tr
            className={cn(
                "[&>th]:py-3 [&>th]:px-4 [&>th]:whitespace-nowrap [&>td]:py-3 [&>td]:px-4",
                className
            )}
            {...props}
        >
            {children}
        </tr>
    );
};
