import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { cn } from "@/app/utils/cn";
import { X } from "lucide-react";
import type { ModalType } from "./modal.type";

const Modal = ({
    children,
    title,
    dialogClassName,
    visible,
    clickOutside = true,
    setVisible,
    hasClose,
    footer,
}: ModalType) => {
    return (
        <Transition show={visible} as={Fragment}>
            <Dialog
                as="div"
                id="app-modal-panel"
                className="relative z-50"
                onClose={() => clickOutside && setVisible(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {/* Backdrop (dark mode-da daha yumşaq) */}
                    <div className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-[2px]" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="w-full flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className={cn(
                                    "w-[min(100vw-2rem,480px)] max-h-[85vh] flex flex-col",
                                    "transform rounded-3xl text-left align-middle transition-all",
                                    // Light
                                    "bg-white text-gray-900 shadow-xl",
                                    // Dark (ağ qalmasın, uyğun navy ton)
                                    "dark:bg-[#0B1220] dark:text-gray-100 dark:border dark:border-white/10",
                                    "dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
                                    dialogClassName,
                                )}
                            >
                                {(title || hasClose) && (
                                    <div className="flex items-center justify-between gap-4 shrink-0 px-8 pt-6 pb-0 smallMobile:px-6 smallMobile:pt-6">
                                        {title && (
                                            <div className="text-24px600 text-gray-900 dark:text-gray-100">
                                                {typeof title === "string" ? (
                                                    <h3>{title}</h3>
                                                ) : (
                                                    title
                                                )}
                                            </div>
                                        )}

                                        {hasClose && (
                                            <button
                                                onClick={() =>
                                                    setVisible(false)
                                                }
                                                className={cn(
                                                    "ml-auto rounded-full p-2 relative z-50 transition-colors",
                                                    "hover:bg-gray-100",
                                                    "dark:hover:bg-white/5",
                                                )}
                                                aria-label="Close modal"
                                                type="button"
                                            >
                                                <X className="text-gray-700 dark:text-white/70" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "thin-scrollbar overflow-y-auto flex-1 px-8 smallMobile:px-6",
                                        footer
                                            ? "pb-4"
                                            : "pb-8 smallMobile:pb-6",
                                        title || hasClose
                                            ? "pt-0"
                                            : "pt-8 smallMobile:pt-6",
                                    )}
                                >
                                    {children}
                                </div>

                                {footer && (
                                    <div className="shrink-0 px-8 pb-8 pt-2 smallMobile:px-6 smallMobile:pb-6">
                                        {footer}
                                    </div>
                                )}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
