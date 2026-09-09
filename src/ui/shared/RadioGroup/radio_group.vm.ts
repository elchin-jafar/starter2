import { type ReactNode } from "react";
import {
    useFormContext,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import { type RadioGroupType } from "./radio_group.type";

export const RadioGroupVM = <
    T extends { id: number; disabled?: boolean; render: ReactNode },
>({
    name,
    value,
    onChange,
    data,
}: Pick<RadioGroupType<T>, "data" | "name" | "value" | "onChange">) => {
    const methods = useFormContext() as UseFormReturn<FieldValues>;

    const watched = methods.watch(name) as number | undefined;

    const innerValue = typeof watched === "number" ? watched : (value ?? null);

    const handleSelect = (id: number) => {
        methods.setValue(name, id);
        const picked = data.find((d) => d.id === id);
        if (picked) onChange?.(picked);
    };

    return { innerValue, handleSelect };
};
