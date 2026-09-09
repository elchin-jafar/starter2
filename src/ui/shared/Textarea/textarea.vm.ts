import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import DOMPurify from "dompurify";
import { type ChangeEvent, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { TextAreaVMType } from "./textarea.type";

export const TextAreaVM = ({
    name,
    onDebounce,
    isDebounce,
    onChange,
}: TextAreaVMType) => {
    const methods: any = useFormContext();

    const hasMethods = !!(methods && methods.formState);

    const watchedValue = useWatch({
        control: methods?.control,
        name,
    });

    const [dirty, setDirty] = useState(false);
    const [innerValue, setInnerValue] = useState<string>("");

    const debouncedValue = useDebounce<string>(innerValue, 500);

    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const sanitizedValue = DOMPurify.sanitize(e.target.value);

        setInnerValue(sanitizedValue);

        if (!dirty) setDirty(true);
        onChange?.(sanitizedValue);
    };

    const reg = hasMethods
        ? methods.register?.(name, {
              onChange: changeHandler,
          })
        : undefined;

    useEffect(() => {
        if (!hasMethods) return;
        if (dirty) return;

        const v = watchedValue ?? "";
        setInnerValue(String(v));
    }, [watchedValue, hasMethods, dirty]);

    useUpdateEffect(() => {
        if (dirty && isDebounce && debouncedValue !== null) {
            onDebounce?.(debouncedValue);
        }
    }, [debouncedValue, dirty, isDebounce, onDebounce]);

    useEffect(() => {
        if (methods?.formState?.isSubmitted && methods.formState.isValid) {
            setDirty(false);
            setInnerValue("");
        }
    }, [methods?.formState?.isSubmitted, methods?.formState?.isValid]);

    return {
        reg,
        methods,
        hasMethods,
        innerValue,
        setInnerValue,
        changeHandler,
        dirty,
        setDirty,
    };
};
