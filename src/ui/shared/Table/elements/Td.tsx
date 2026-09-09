import { cn } from "@/app/utils/cn";
import type { TableDataCellType } from "../table.type";

export const TD = ({ children, className, ...rest }: TableDataCellType) => {
  return (
    <td className={cn("w-auto text-12px500 h-[60px]", className)} {...rest}>
      {children}
    </td>
  );
};
