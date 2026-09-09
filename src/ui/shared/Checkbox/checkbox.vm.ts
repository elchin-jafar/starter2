import {
    type FieldValues,
    useFormContext,
    type UseFormReturn,
} from "react-hook-form";
import type { CheckboxVMType } from "./checkbox.type";

export const CheckboxVM = <T extends { id: number | string } | null>({
    name,
    onChange,
    value,
    valueType,
    data,
}: CheckboxVMType<T>) => {
    const methods: UseFormReturn<FieldValues, any, undefined> =
        useFormContext();
    const hasMethods = methods && methods.formState;
    const mainValue = hasMethods ? methods.getValues(name) : value;

    const isChecked =
        valueType === "object" ? mainValue?.id === data?.id : !!mainValue;

    const handleCheck = (checked: boolean) => {
        const valueToSet =
            valueType === "object" ? (checked ? data : null) : checked;

        if (methods) {
            methods.setValue(name, valueToSet);
            methods.trigger(name);
        }
        if (valueType === "object") {
            onChange?.(valueToSet as T | null);
        } else {
            onChange?.(!!valueToSet as boolean);
        }
    };

    return { handleCheck, isChecked };
};
