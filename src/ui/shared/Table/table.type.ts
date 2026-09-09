import type { RequestStateEnum } from "@/data/enum/request_state.enum";
import { type NestedKeysType } from "@/data/types/nested_keys.type";
import { type ClassValue } from "clsx";
import type {
    DetailedHTMLProps,
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
    ReactNode,
    TdHTMLAttributes,
    ThHTMLAttributes,
} from "react";

export type TableHeaderBaseType = {
    id: number | string;
    name?: string | ReactNode;
    width?: string;
    className?: string;
};

export type TableHeaderType<T> = TableHeaderBaseType &
    (
        | { key: NestedKeysType<T>; render?: undefined }
        | { key?: never; render: (row: T, index: number) => ReactNode }
    );

export type TableType<T extends { id: number | string }> = {
    headData: TableHeaderType<T>[];
    bodyData: T[];
    state?: RequestStateEnum;
    title?: ReactNode;
    className?: string;
    trClassname?: string | ((row: T) => ClassValue);
    thClassName?: string;
    total?: number;
    pagination?: { total?: number; perPage?: number };
    showMore?: boolean;
};

/** ✅ TR props (for <tr>) */
export type TableRowType = PropsWithChildren &
    DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
    > & {
        className?: string;
        onClick?: MouseEventHandler<HTMLTableRowElement>;
    };

/** ✅ TD props (for <td>) */
export type TableDataCellType = PropsWithChildren &
    DetailedHTMLProps<
        TdHTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
    > & {
        className?: string;
    };

/** ✅ TH props (optional, if you want) */
export type TableHeadCellType = PropsWithChildren &
    DetailedHTMLProps<
        ThHTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
    > & {
        className?: string;
    };

export type TitleDataType = PropsWithChildren<{
    className?: string;
}>;
