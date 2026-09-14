import UserAddForm from "@/ui/features/users/add";
import Modal from "@/ui/shared/Modal";
import type { UserAddModalType } from "./user_add_modal.type";

const UserAddModal = ({ visible, setVisible }: UserAddModalType) => {
    return (
        <Modal
            hasClose
            visible={visible}
            setVisible={setVisible}
            title={
                <div className="flex flex-col min-w-0">
                    <h3 className="text-18px700 text-gray-900 dark:text-gray-100">
                        İstifadəçi əlavə et
                    </h3>
                </div>
            }
        >
            <UserAddForm />
        </Modal>
    );
};

export default UserAddModal;
