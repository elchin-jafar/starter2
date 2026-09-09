import { ButtonVM } from "./button.vm";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import { ButtonType } from "./button.type";
import { cn } from "@/app/utils/cn";

const Button = ({
    variant = ButtonVariantsEnum.FILLED,
    className,
    isLoading,
    disabled,
    children,
    ...props
}: ButtonType) => {
    const { variants, rippleEffect } = ButtonVM();

    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            onMouseDown={rippleEffect}
            className={cn(
                "relative gap-2 transition-all leading-tight disabled:cursor-not-allowed border text-18px600 rounded-xl duration-300 ease-in flex items-center justify-center w-full h-14 z-10 px-6 overflow-hidden [&>span]:absolute [&>span]:z-50 [&>span]:animate-ripple [&>span]:inline-block [&>span]:bg-white/50 [&>span]:-translate-y-1/2 [&>span]:-translate-x-1/2 [&>span]:pointer-events-none [&>span]:rounded-full [&>span]:scale-0",
                variants[variant],
                className || "",
            )}
        >
            {isLoading ? (
                <div className="relative">
                    <div className="spinner size-7 border-gray-300 opacity-90 border-2 rounded-full"></div>
                    <div className="spinner size-7  border-green-700 opacity-70 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
                </div>
            ) : (
                children
            )}
        </button>
    );
};
export default Button;
