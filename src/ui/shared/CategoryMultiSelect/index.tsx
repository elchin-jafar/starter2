import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/app/utils/cn";

type Option = { id: number; name: string };

type Props = {
    options: Option[];
    value: number[];
    onChange: (ids: number[]) => void;
    placeholder?: string;
    isLoading?: boolean;
};

const CategoryMultiSelect = ({
    options,
    value,
    onChange,
    placeholder = "Seçin",
    isLoading,
}: Props) => {
    const selected = options.filter((o) => value.includes(o.id));

    const toggle = (ids: number[]) => onChange(ids);

    const remove = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((v) => v !== id));
    };

    return (
        <div className="w-full">
            <Listbox value={value} onChange={toggle} multiple>
                {({ open }) => (
                    <div className="relative">
                        <ListboxButton
                            className={cn(
                                "relative w-full min-h-12 rounded-lg border text-left px-3 py-2",
                                "bg-white border-gray-200 focus:outline-none",
                                "dark:bg-white/5 dark:border-white/12",
                                open && "border-gray-500 dark:border-white/25",
                            )}
                        >
                            <div className="flex flex-wrap gap-1.5 pr-7">
                                {selected.length === 0 ? (
                                    <span className="text-sm text-gray-500 dark:text-white/55 leading-8">
                                        {placeholder}
                                    </span>
                                ) : (
                                    selected.map((opt) => (
                                        <span
                                            key={opt.id}
                                            className={cn(
                                                "inline-flex items-center gap-1 rounded-lg px-2 py-0.5",
                                                "bg-teal-50 text-teal-700 text-12px500",
                                                "dark:bg-teal-500/15 dark:text-teal-300",
                                            )}
                                        >
                                            {opt.name}
                                            <button
                                                type="button"
                                                onClick={(e) =>
                                                    remove(opt.id, e)
                                                }
                                                className="ml-0.5 rounded-full hover:bg-teal-200/50 dark:hover:bg-teal-400/20 p-0.5"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </span>
                                    ))
                                )}
                            </div>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                <ChevronDown
                                    className={cn(
                                        "size-4 text-gray-500 dark:text-white/50 transition-transform",
                                        open && "rotate-180",
                                    )}
                                />
                            </span>
                        </ListboxButton>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions
                                className={cn(
                                    "absolute z-50 mt-1 w-full max-h-56 overflow-auto rounded-lg p-1",
                                    "bg-white ring-1 ring-black/5",
                                    "dark:bg-gray-900 dark:ring-white/10",
                                )}
                            >
                                {isLoading ? (
                                    <p className="py-2 text-center text-sm text-gray-500 dark:text-white/50">
                                        Yüklənir...
                                    </p>
                                ) : options.length === 0 ? (
                                    <p className="py-2 text-center text-sm text-gray-500 dark:text-white/50">
                                        Kateqoriya yoxdur
                                    </p>
                                ) : (
                                    options.map((opt) => (
                                        <ListboxOption
                                            key={opt.id}
                                            value={opt.id}
                                            className={({ focus }) =>
                                                cn(
                                                    "flex items-center justify-between gap-2 rounded-md px-3 py-2 cursor-pointer text-sm",
                                                    focus
                                                        ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
                                                        : "text-gray-700 dark:text-white/80",
                                                )
                                            }
                                        >
                                            {({ selected: isSelected }) => (
                                                <>
                                                    <span>{opt.name}</span>
                                                    {isSelected && (
                                                        <Check className="size-4 shrink-0 text-teal-600 dark:text-teal-400" />
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))
                                )}
                            </ListboxOptions>
                        </Transition>
                    </div>
                )}
            </Listbox>
        </div>
    );
};

export default CategoryMultiSelect;
