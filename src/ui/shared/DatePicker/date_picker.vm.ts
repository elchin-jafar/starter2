import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import type { DatePickerVMType } from "./date_picker.type";

dayjs.extend(customParseFormat);

export const DatePickerVM = ({
    name,
    value,
    onChange,
    showTime,
}: DatePickerVMType) => {
    const methods = useFormContext();
    const hasMethods = methods && methods.formState;
    const mainValue = hasMethods ? methods.getValues(name) : value;

    const toDayjs = (v: unknown): Dayjs | null => {
        if (!v) return null;
        if (dayjs.isDayjs(v)) return v;

        if (typeof v === "string") {
            const d = dayjs(
                v,
                [
                    "YYYY-MM-DDTHH:mm:ss",
                    "YYYY-MM-DDTHH:mm",
                    "DD.MM.YYYY HH:mm",
                    "DD.MM.YYYY",
                    "YYYY-MM-DD",
                    "DD-MM-YYYY",
                ],
                true,
            );
            return d.isValid() ? d : null;
        }
        return null;
    };

    const [datePicker, setDatePicker] = useState<Dayjs | null>(() =>
        toDayjs(mainValue),
    );

    useEffect(() => {
        setDatePicker(toDayjs(mainValue));
    }, [mainValue]);

    const collapse = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    useClickOutside(collapse.current, () => setOpen(false), [
        ".MuiPickersPopper-root",
    ]);

    const handleDatePicker = (val: Dayjs | null) => {
        if (!val) return;

        const formatted = showTime
            ? val.format("YYYY-MM-DDTHH:mm:ss")
            : val.format("YYYY-MM-DD");

        if (methods) {
            methods.setValue(name, formatted);
            methods.trigger(name);
        }

        setDatePicker(val);
        onChange?.(formatted);
    };

    const isError =
        !!hasMethods &&
        !!methods.formState.errors?.[name] &&
        methods.formState.submitCount > 0;

    return {
        methods,
        collapse,
        setOpen,
        open,
        isError,
        datePicker,
        handleDatePicker,
    };
};
