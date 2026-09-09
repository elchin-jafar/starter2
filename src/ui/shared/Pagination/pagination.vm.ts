import { useSearchParams } from "react-router";
import type { PaginationVMType } from "./pagination.type";

export const PaginationVM = ({
    total = 0,
    perPage = 10,
    pageChange,
}: PaginationVMType) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageCount = Math.ceil(total / perPage);

    const handlePageClick = ({ selected }: { selected: number }) => {
        selected
            ? params.set("page", String(selected + 1))
            : params.delete("page");
        setSearchParams(params);
        pageChange?.(selected);
    };

    return { pageCount, currentPage, handlePageClick };
};
