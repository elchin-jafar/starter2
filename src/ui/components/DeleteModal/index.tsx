import Modal from "@/ui/shared/Modal";
import { Trash2, TriangleAlert } from "lucide-react";
import type { DeleteModalType } from "./delete_modal.type";

const DeleteModal = ({
    visible,
    setVisible,
    title,
    description,
    action,
    titleIcon = <Trash2 className="size-5 text-red-600 dark:text-red-300" />,
    subtitle = "Bu əməliyyat geri qaytarılmır.",
}: DeleteModalType) => {
    return (
        <Modal
            hasClose
            visible={visible}
            setVisible={setVisible}
            title={
                <div className="flex items-center gap-3">
                    <div className="shrink-0 grid size-10 place-items-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                        {titleIcon}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h3 className="text-18px700 text-gray-900 dark:text-gray-100">
                            {title}
                        </h3>
                        <p className="text-12px400 text-gray-500 dark:text-white/60">
                            {subtitle}
                        </p>
                    </div>
                </div>
            }
        >
            <div className="mt-6 flex flex-col items-center text-center">
                <div className="grid size-20 place-items-center rounded-3xl bg-red-50 dark:bg-red-500/10 border border-transparent dark:border-white/10">
                    <TriangleAlert className="size-10 text-red-600 dark:text-red-300" />
                </div>

                <p className="mt-4 max-w-[420px] text-14px400 text-gray-600 dark:text-white/65">
                    {description}
                </p>

                <div className="mt-6 flex w-full gap-4">{action}</div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
