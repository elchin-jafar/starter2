import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import UserForm from "@/ui/components/UserForm";
import { useAddUserApi } from "@/app/modules/users/api/addUser.api";
import type { UserAddModalType } from "./user_add_modal.type";

const FORM_ID = "user-add-form";

const UserAddModal = ({ visible, setVisible }: UserAddModalType) => {
    const addUser = useAddUserApi();

    return (
        <Modal
            hasClose
            visible={visible}
            setVisible={setVisible}
            title={
                <div className="flex flex-col min-w-0">
                    <h3 className="text-18px700 text-gray-900 dark:text-gray-100">
                        Istifadeci elave et
                    </h3>
                </div>
            }
            footer={
                <div className="flex w-full gap-4">
                    <Button
                        variant={ButtonVariantsEnum.OUTLINED}
                        onClick={() => setVisible(false)}
                        className="cursor-pointer"
                    >
                        Legv et
                    </Button>
                    <Button
                        type="submit"
                        form={FORM_ID}
                        isLoading={addUser.isPending}
                        className="cursor-pointer"
                    >
                        Elave et
                    </Button>
                </div>
            }
        >
            <UserForm
                formId={FORM_ID}
                onSubmit={(values) =>
                    addUser.mutate(
                        { ...values, age: String(values.age) },
                        { onSuccess: () => setVisible(false) },
                    )
                }
            />
        </Modal>
    );
};

export default UserAddModal;
