import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import type { InputVMType } from "./input.type";

export const InputVM = ({
    name,
    type,
    mask,
    pattern,
    isDebounce,
    onDebounce,
    onChange,
}: InputVMType) => {
    const methods = useFormContext();
    const [innerValue, setInnerValue] = useState<string>("");
    const [dirty, setDirty] = useState(false);

    const debouncedValue = useDebounce<string>(innerValue, 500);
    const hasMethods = !!methods && !!methods.formState;

    const inputMaskRef = useMask({
        mask,
        replacement: pattern,
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value;

        if (type === "number") {
            v = v.replace(/[^\d]/g, "");

            const input = e.currentTarget as HTMLInputElement;
            const maxAttr = input.max;
            const hasMax = !!maxAttr;
            const maxNum = hasMax ? Number(maxAttr) : undefined;
            const maxLen = hasMax ? String(maxAttr).length : undefined;

            if (hasMax) {
                if (maxLen && v.length > maxLen) v = v.slice(0, maxLen);
                if (maxNum !== undefined && v !== "" && Number(v) > maxNum) {
                    v = String(maxNum);
                }
            }

            input.value = v;

            if (hasMethods) {
                methods.setValue(name, v === "" ? null : Number(v), {
                    shouldDirty: true,
                    shouldValidate: true,
                });
            }

            if (isDebounce) setInnerValue(v);
            if (!dirty) setDirty(true);
            onChange?.(v);

            return;
        }

        if (isDebounce) setInnerValue(v);
        if (!dirty) setDirty(true);
        onChange?.(v);
    };

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!hasMethods) return;

        if (type === "number") {
            const v = e.target.value.trim();

            if (v === "") {
                methods.setValue(name, null, {
                    shouldDirty: false,
                    shouldValidate: true,
                });
            }
        }
    };

    useUpdateEffect(() => {
        if (dirty && isDebounce) {
            onDebounce?.(innerValue);
        }
    }, [debouncedValue]);

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (type === "number") {
            const blocked = ["e", "E", "+", "-", "."];
            if (blocked.includes(e.key)) e.preventDefault();
        }
    };

    const numberInputOnWheelPreventChange = (
        e: React.WheelEvent<HTMLInputElement>,
    ) => {
        const target = e.target as HTMLInputElement;
        target.blur();
        e.stopPropagation();
    };

    const preventScrolling =
        type === "number"
            ? {
                  onWheel: numberInputOnWheelPreventChange,
              }
            : undefined;

    const reg = methods
        ? {
              ...methods.register(name, {
                  onChange: (e) =>
                      changeHandler(e as ChangeEvent<HTMLInputElement>),
                  onBlur: (e) =>
                      blurHandler(e as React.FocusEvent<HTMLInputElement>),
              }),
          }
        : undefined;

    const regWithRef = mask
        ? {
              ...reg,
              ref: (e: HTMLInputElement) => {
                  reg?.ref(e);
                  inputMaskRef.current = e;
              },
          }
        : reg;

    return {
        reg: regWithRef,
        preventScrolling,
        hasMethods,
        methods,
        keyDownHandler,
        changeHandler,
    };
};
