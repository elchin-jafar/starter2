import ReactPaginateModule from "react-paginate";

// TODO: Improve ReactPaginate import method here
const ReactPaginate = ((ReactPaginateModule as unknown as { default?: unknown })
    .default ?? ReactPaginateModule) as typeof ReactPaginateModule;

import { cn } from "@/app/utils/cn";
import { ChevronRight } from "lucide-react";

import type { PaginationType } from "./pagination.type";
import { PaginationVM } from "./pagination.vm";

const Pagination = ({
    total = 0,
    perPage = 10,
    pageChange,
}: PaginationType) => {
    const { pageCount, currentPage, handlePageClick } = PaginationVM({
        total,
        perPage,
        pageChange,
    });

    return (
        <div className={cn("items-center gap-x-4", total ? "flex" : "hidden")}>
            {total > perPage && (
                <ReactPaginate
                    containerClassName={cn(
                        "w-fit py-1 px-4 mx-auto flex items-center rounded select-none gap-x-1",
                        "bg-white/0 dark:bg-transparent",
                    )}
                    pageClassName={cn(
                        "size-9 flex items-center justify-center rounded-[10px]",
                        "text-sm font-semibold",
                        "text-gray-700 hover:bg-gray-50",
                        "dark:text-gray-200 dark:hover:bg-white/10",
                    )}
                    pageLinkClassName="w-full h-full flex items-center justify-center"
                    activeClassName={cn(
                        "pointer-events-none size-9 flex items-center justify-center rounded-[10px] border",
                        "bg-gray-50 border-gray-200 text-gray-900",
                        "dark:bg-white/10 dark:border-white/15 dark:text-white",
                    )}
                    breakLabel={
                        <span className="px-2 text-gray-500 dark:text-gray-400">
                            ...
                        </span>
                    }
                    previousLabel={
                        <div
                            className={cn(
                                "rotate-180 size-9 flex justify-center items-center rounded-[10px] mr-6 border",
                                "border-gray-300 text-gray-700 hover:bg-gray-50",
                                "dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10",
                                currentPage === 1 &&
                                    "opacity-30 pointer-events-none",
                            )}
                        >
                            <ChevronRight width={20} height={20} />
                        </div>
                    }
                    nextLabel={
                        <div
                            className={cn(
                                "size-9 flex justify-center items-center rounded-[10px] ml-6 border",
                                "border-gray-300 text-gray-700 hover:bg-gray-50",
                                "dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10",
                                currentPage === pageCount &&
                                    "opacity-30 pointer-events-none",
                            )}
                        >
                            <ChevronRight width={20} height={20} />
                        </div>
                    }
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    initialPage={currentPage - 1}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                />
            )}
        </div>
    );
};

export default Pagination;
