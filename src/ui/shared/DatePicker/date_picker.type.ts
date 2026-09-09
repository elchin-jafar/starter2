import { Dayjs } from "dayjs";

export type DatePickerType = {
    name: string;
    value?: Dayjs | null;
    title?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    disablePast?: boolean;
    showTime?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    onChange?: (value: string) => void;
};

export type DatePickerVMType = Pick<
    DatePickerType,
    "value" | "name" | "onChange" | "showTime"
>;
