import UserEditForm from "@/ui/features/users/edit";
import Modal from "@/ui/shared/Modal";
import type { UserEditModalType } from "./user_edit_modal.type";

const UserEditModal = ({ visible, setVisible }: UserEditModalType) => {
    return (
        <Modal
            hasClose
            visible={visible}
            setVisible={setVisible}
            title={
                <div className="flex flex-col min-w-0">
                    <h3 className="text-18px700 text-gray-900 dark:text-gray-100">
                        İstifadəçini redaktə et
                    </h3>
                </div>
            }
        >
            <UserEditForm />
        </Modal>
    );
};

export default UserEditModal;
