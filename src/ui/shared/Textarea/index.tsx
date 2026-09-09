import { cn } from "@/app/utils/cn";
import type { TextareaType } from "./textarea.type";
import { TextAreaVM } from "./textarea.vm";

const TextArea = ({
    label,
    name,
    trailing,
    trailingClassName,
    placeholder,
    className,
    isDebounce = true,
    onChange,
    onDebounce,
    ...props
}: TextareaType) => {
    const { reg, methods, hasMethods, innerValue, changeHandler } = TextAreaVM({
        name,
        onChange,
        isDebounce,
        onDebounce,
    });

    const fieldError = hasMethods
        ? name
              .split(".")
              .reduce((acc: any, key) => acc?.[key], methods.formState.errors)
        : undefined;
    const hasErr = !!fieldError;

    return (
        <div className={cn("w-full relative", props.maxLength && "mb-2")}>
            <textarea
                aria-label={name}
                id={name}
                placeholder={label ? " " : placeholder}
                className={cn(
                    "border rounded-xl w-full px-4 pt-4 h-full min-h-[88px] peer text-15px400 resize-y transition-colors duration-200",
                    "bg-white text-gray-900 border-gray-300",
                    "placeholder:text-gray-400",
                    "dark:bg-[#0B1220] dark:text-gray-100 dark:border-white/10",
                    "dark:placeholder:text-white/40",
                    hasErr && "border-red-500 dark:border-red-500",
                    trailing && "pr-10",
                    className || "",
                )}
                onChange={hasMethods ? undefined : changeHandler}
                {...props}
                {...reg}
            />

            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "absolute text-14px400 duration-300 transform -translate-y-1/2 scale-75 top-4 -left-0.5 z-10 origin-[0]",
                        "peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2",
                        "peer-focus:top-4 peer-focus:scale-75",
                        "text-gray-500 dark:text-white/60",
                    )}
                >
                    {label}
                </label>
            )}

            <div
                className={cn(
                    "cursor-pointer absolute top-5 right-5 text-gray-600 dark:text-white/70",
                    trailingClassName,
                )}
            >
                {trailing}
            </div>

            {hasErr && (
                <span role="alert" className="text-error-500 text-14px400">
                    {fieldError.message}
                </span>
            )}

            {!!props.maxLength && (
                <p className="text-12px400 text-gray-500 dark:text-white/55">
                    {Math.max(
                        props.maxLength - (innerValue ? innerValue.length : 0),
                        0,
                    )}{" "}
                    simvol qalıb
                </p>
            )}
        </div>
    );
};

export default TextArea;
