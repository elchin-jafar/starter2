// TableContainer.tsx
import Pagination from "../Pagination";
import { TD, THead, TR } from ".";
import { cn } from "@/app/utils/cn";
import type { TableType } from "./table.type";
import { RequestStateEnum } from "@/data/enum/request_state.enum";
import { getNestedValue } from "@/app/helpers/getNestedValue";

export const TableContainer = <T extends { id: number | string }>({
    headData,
    bodyData,
    state = RequestStateEnum.SUCCESS,
    trClassname,
    thClassName,
    className,
    title,
    pagination,
}: TableType<T>) => {
    const render = () => {
        switch (state) {
            case RequestStateEnum.LOADING:
                return [...Array(5)].map((_, i) => (
                    <TR
                        key={i}
                        className="border-b border-transparent last:border-0"
                    >
                        {[...Array(headData?.length)].map((_, idx) => (
                            <TD key={idx}>
                                <div className="h-4 w-full rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
                            </TD>
                        ))}
                    </TR>
                ));

            case RequestStateEnum.SUCCESS:
                return bodyData.map((row, rowIndex) => (
                    <TR
                        key={row.id}
                        className={cn(
                            "group border-b last:border-none",
                            "transition-colors",
                            "hover:bg-[#EEF9F9] dark:hover:bg-gray-900/40",
                            typeof trClassname === "string"
                                ? trClassname
                                : trClassname?.(row),
                        )}
                    >
                        {headData.map((header) => (
                            <TD key={header.id} className="align-middle">
                                {header.render
                                    ? header.render(row, rowIndex)
                                    : getNestedValue(row, header.key)}
                            </TD>
                        ))}
                    </TR>
                ));

            case RequestStateEnum.EMPTY:
                return (
                    <TR className="border-b border-gray-100 dark:border-gray-800">
                        <TD className="py-10" colSpan={headData.length}>
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Məlumat tapılmadı
                            </div>
                        </TD>
                    </TR>
                );
        }
    };

    return (
        <div className="flex flex-col relative z-10">
            <div
                className={cn(
                    "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950",
                    "shadow-sm",
                    className,
                )}
            >
                {title && <div className="px-5 pt-5 pb-3">{title}</div>}

                <div className="relative">
                    <div className="relative overflow-x-auto mobile-scrollbar-hidden">
                        <table className="w-full table-auto text-left text-sm">
                            <THead
                                data={headData}
                                thClassName={cn("z-20", thClassName)}
                            />
                            <tbody>{render()}</tbody>
                        </table>
                    </div>

                    {pagination &&
                        state === RequestStateEnum.SUCCESS &&
                        pagination.total! > pagination.perPage! && (
                            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                                <Pagination
                                    total={pagination.total!}
                                    perPage={pagination.perPage}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};
