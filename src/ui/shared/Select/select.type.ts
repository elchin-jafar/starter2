import type { BaseType } from "@/data/types/base.type";
import type { SelectOptionVariantEnum } from "./select.enum";
import type { Overwrite } from "@/data/types/overwrite.type";

export type SelectDataType = Overwrite<
    BaseType,
    { id: number | string | null }
> & {
    disabled?: boolean;
};

export type SelectType<T extends SelectDataType> = {
    data: readonly T[];
    className?: string;
    buttonClassName?: string;
    label?: string;
    name: string;
    hasReset?: boolean;
    isLoading?: boolean;
    value?: T | null | number | string;
    variant?: SelectOptionVariantEnum;
    onChange?: (value: T) => void;
};
