import { type TableHeaderType } from "../table.type";
import { TR } from "..";
import { cn } from "@/app/utils/cn";

export const THead = <T,>({
    data,
    thClassName,
}: {
    data: TableHeaderType<T>[];
    thClassName?: string;
}) => {
    const concreteWidth = data.filter((d) => !d.width);

    return (
        <thead className="sticky top-0 z-20">
            <TR className="h-[56px]">
                {data.map((th) => {
                    const width = th.width || `${100 / concreteWidth.length}%`;

                    return (
                        <th
                            key={th.id}
                            className={cn(
                                "text-14px500 font-semibold tracking-wide",
                                "text-gray-600 dark:text-gray-300",
                                "bg-gray-50 dark:bg-gray-950",
                                "border-b border-gray-200 dark:border-gray-800",
                                "first:rounded-tl-2xl last:rounded-tr-2xl",
                                thClassName,
                            )}
                            style={{
                                width,
                                minWidth: th.width,
                                maxWidth: th.width,
                            }}
                        >
                            {th.name}
                        </th>
                    );
                })}
            </TR>
        </thead>
    );
};
