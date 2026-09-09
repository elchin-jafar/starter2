import { cn } from "@/app/utils/cn";
import { Checkbox as CheckboxHUI, Field, Label } from "@headlessui/react";
import { Check } from "lucide-react";
import type { CheckboxType } from "./checkbox.type";
import { CheckboxVM } from "./checkbox.vm";

const Checkbox = <T extends { id: number | string } | null>({
    name,
    value,
    label,
    onChange,
    className,
    svgClassName,
    valueType = "boolean",
    data,
}: CheckboxType<T>) => {
    const { handleCheck, isChecked } = CheckboxVM({
        name,
        value,
        onChange,
        valueType,
        data,
    });

    return (
        <Field className="flex items-center gap-3">
            <CheckboxHUI
                name={name}
                checked={isChecked}
                onChange={handleCheck}
                className={cn(
                    "group centered cursor-pointer flex items-center justify-center w-5 h-5",
                    "size-[18px] rounded-md bg-white border border-gray-200 data-[checked]:border-none data-[checked]:bg-teal-600",
                    "shadow-sm transition",
                    "focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-white",
                    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                    "data-[checked]:data-[disabled]:bg-gray-500 data-[checked]:data-[disabled]:border-gray-500",
                    className,
                )}
            >
                {/* <div className="group-data-[checked]:block"> */}
                <Check
                    strokeWidth={3}
                    className={cn("size-4 text-white", svgClassName)}
                />
            </CheckboxHUI>

            {label ? (
                <Label className="select-none text-14px400 text-gray-700 data-[disabled]:opacity-50 cursor-pointer">
                    {label}
                </Label>
            ) : undefined}
        </Field>
    );
};

export default Checkbox;
