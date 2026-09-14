import { setUsersModal } from "@/app/store/modal";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import Button from "@/ui/shared/Button";
import Form from "@/ui/shared/Form";
import Input from "@/ui/shared/Input";
import { UserEditFormVM } from "./user_edit.vm";

const UserEditForm = () => {
    const { dispatch, methods, submitHandler, editUser } = UserEditFormVM();
    return (
        <Form methods={methods} onSubmit={submitHandler}>
            <div className="my-2">
                <label>Ad</label>
                <Input name="firstName" />
            </div>
            <div className="my-2">
                <label>Soyad</label>
                <Input name="lastName" />
            </div>
            <div className="my-2">
                <label>Yaş</label>
                <Input name="age" />
            </div>
            <div className="my-2">
                <label>Email</label>
                <Input name="email" />
            </div>

            <div className="flex w-full gap-4 mt-8">
                <Button
                    type="button"
                    variant={ButtonVariantsEnum.OUTLINED}
                    onClick={() =>
                        dispatch(setUsersModal({ type: "edit", value: false }))
                    }
                    className="cursor-pointer"
                >
                    Ləğv et
                </Button>
                <Button
                    type="submit"
                    isLoading={editUser.isPending}
                    className="cursor-pointer"
                >
                    Yadda saxla
                </Button>
            </div>
        </Form>
    );
};

export default UserEditForm;
