"use client";
import { handleError } from "@/app/helpers/handleError";
import { type InputType } from "./input.type";
import { cn } from "@/app/utils/cn";
import { InputVM } from "./input.vm";

const Input = ({
    label,
    leading,
    trailing,
    name,
    type,
    isDebounce = false,
    mask,
    pattern,
    placeholder,
    className,
    inputClassName,
    wrapperClassName,
    showErrorText = true,
    onChange,
    onDebounce,
    ...props
}: InputType) => {
    const {
        reg,
        hasMethods,
        methods,
        preventScrolling,
        keyDownHandler,
        changeHandler,
    } = InputVM({
        name,
        type,
        mask,
        pattern,
        isDebounce,
        onDebounce,
        onChange,
    });

    const hasErr = hasMethods && !!handleError(name, methods);

    return (
        <div className={cn("w-full", wrapperClassName)}>
            <div
                className={cn(
                    "relative flex items-center gap-x-4 px-4 border h-14 border-solid rounded-xl",
                    "transition-colors duration-200",
                    props?.disabled
                        ? "bg-gray-100 dark:bg-white/5"
                        : "bg-white dark:bg-[#0B1220]",
                    hasErr
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 focus-within:border-gray-400 dark:border-white/10 dark:focus-within:border-white/20",
                    className,
                )}
            >
                {leading}

                <div className="relative h-full flex-grow">
                    <input
                        aria-label={name}
                        id={name}
                        type={type}
                        placeholder={label ? " " : placeholder}
                        className={cn(
                            "w-full h-full peer bg-transparent",
                            "text-gray-900 dark:text-gray-100",
                            "placeholder:text-gray-400 dark:placeholder:text-white/40",
                            "text-15px400 placeholder:text-15px400",
                            "caret-teal-600 dark:caret-teal-300",
                            "dark:text-gray-100 dark:placeholder:text-white/40",
                            label ? "pt-3" : "",
                            inputClassName,
                        )}
                        onKeyDown={keyDownHandler}
                        onChange={changeHandler}
                        {...preventScrolling}
                        {...props}
                        {...reg}
                    />

                    {label && (
                        <label
                            htmlFor={name}
                            className={cn(
                                "absolute text-14px400 duration-300 transform -translate-y-1/2 scale-75 top-4 -left-0.5 z-10 origin-[0]",
                                "peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
                                "peer-focus:top-4 peer-focus:scale-75",
                                "text-gray-500 dark:text-white/60",
                            )}
                        >
                            {label}
                        </label>
                    )}
                </div>

                {trailing}
            </div>

            {hasMethods &&
            showErrorText &&
            Object.values(methods.formState.errors).length ? (
                <span role="alert" className="text-error-500 text-14px400">
                    {handleError(name, methods)}
                </span>
            ) : null}
        </div>
    );
};

export default Input;
