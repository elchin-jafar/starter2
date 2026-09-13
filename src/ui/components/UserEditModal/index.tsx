import { useMemo } from "react";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import UserForm from "@/ui/components/UserForm";
import { useGetByIdUserApi } from "@/app/modules/users/api/getByIdUser.api";
import { useUpdateUserApi } from "@/app/modules/users/api/updateUser.api";
import type { UserEditModalType } from "./user_edit_modal.type";

const FORM_ID = "user-edit-form";

const UserEditModal = ({ visible, setVisible, userId }: UserEditModalType) => {
    const { data: user } = useGetByIdUserApi({ id: Number(userId) });
    const updateUser = useUpdateUserApi();

    const defaultValues = useMemo(
        () =>
            user
                ? {
                      firstName: user.firstName,
                      lastName: user.lastName,
                      age: user.age,
                      email: user.email,
                  }
                : undefined,
        [user],
    );

    return (
        <Modal
            hasClose
            visible={visible}
            setVisible={setVisible}
            title={
                <div className="flex flex-col min-w-0">
                    <h3 className="text-18px700 text-gray-900 dark:text-gray-100">
                        Istifadecini redakte et
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
                        isLoading={updateUser.isPending}
                        className="cursor-pointer"
                    >
                        Yadda saxla
                    </Button>
                </div>
            }
        >
            <UserForm
                formId={FORM_ID}
                defaultValues={defaultValues}
                onSubmit={(values) =>
                    updateUser.mutate(
                        {
                            id: Number(userId),
                            data: { ...values, age: String(values.age) },
                        },
                        { onSuccess: () => setVisible(false) },
                    )
                }
            />
        </Modal>
    );
};

export default UserEditModal;
