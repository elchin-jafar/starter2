import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/az";
import "./datepicker.css";
import { cn } from "@/app/utils/cn";
import { Calendar } from "lucide-react";
import { DatePickerVM } from "./date_picker.vm";
import type { DatePickerType } from "./date_picker.type";

function DatePicker({
    title,
    value,
    name,
    onChange,
    className,
    placeholder,
    disablePast,
    showTime,
    minDate,
    maxDate,
    ...props
}: DatePickerType) {
    const {
        methods,
        setOpen,
        collapse,
        open,
        isError,
        datePicker,
        handleDatePicker,
    } = DatePickerVM({
        name,
        onChange,
        value,
        showTime,
    });

    const defaultPlaceholder = showTime
        ? "Tarix və saat əlavə et"
        : "Tarix əlavə et";
    const displayFormat = showTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY";

    const sharedSlotProps = {
        textField: {
            inputProps: { placeholder: placeholder ?? defaultPlaceholder },
            fullWidth: true,
            variant: "filled" as const,
            InputProps: {
                disableUnderline: true,
                classes: {
                    root: cn(
                        "h-14 !pr-5 border !cursor-pointer !rounded-xl",
                        "disabled:bg-gray-100 !bg-white",
                        "dark:!bg-[#0B1220] dark:disabled:bg-white/5 dark:border-white/10",
                        isError
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-300 dark:border-white/10",
                        "transition-colors duration-200",
                        "hover:border-gray-400 dark:hover:border-white/20",
                        className,
                    ),
                    input: cn(
                        "!pl-5 !py-2 cursor-pointer !w-full",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-white/40",
                    ),
                },
            },
            sx: {
                "& .MuiInputAdornment-root": { color: "inherit" },
                "& .MuiSvgIcon-root": { color: "inherit" },
            },
            onClick: () => setOpen(true),
            helperText: isError && (
                <span className="text-red-500 text-14px400 -ml-3.5">
                    {methods.formState.errors[name]!.message as string}
                </span>
            ),
        },
    };

    return (
        <div data-rhf-name={name} ref={collapse}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="az">
                {showTime ? (
                    <MUIDateTimePicker
                        format={displayFormat}
                        label={title}
                        value={datePicker}
                        minDate={minDate}
                        maxDate={maxDate}
                        disablePast={disablePast}
                        ampm={false}
                        {...props}
                        onChange={handleDatePicker}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        slots={{
                            openPickerIcon: () => (
                                <Calendar className="size-5" />
                            ),
                        }}
                        slotProps={sharedSlotProps}
                    />
                ) : (
                    <MUIDatePicker
                        format={displayFormat}
                        label={title}
                        value={datePicker}
                        minDate={minDate}
                        maxDate={maxDate}
                        disablePast={disablePast}
                        {...props}
                        onChange={handleDatePicker}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        slots={{
                            openPickerIcon: () => (
                                <Calendar className="size-5" />
                            ),
                        }}
                        slotProps={sharedSlotProps}
                    />
                )}
            </LocalizationProvider>
        </div>
    );
}

export default DatePicker;
