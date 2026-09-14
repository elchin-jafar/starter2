import { setUsersModal } from "@/app/store/modal";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import Button from "@/ui/shared/Button";
import Form from "@/ui/shared/Form";
import Input from "@/ui/shared/Input";
import { UserAddFormVM } from "./user_add.vm";

const UserAddForm = () => {
    const { addUser, dispatch, methods, submitHandler } = UserAddFormVM();
    return (
        <Form methods={methods} onSubmit={submitHandler}>
            <div>
                <label>Ad</label>
                <Input name="firstName" />
            </div>
            <div>
                <label>Soyad</label>
                <Input name="lastName" />
            </div>
            <div>
                <label>Yaş</label>
                <Input name="age" />
            </div>
            <div>
                <label>Email</label>
                <Input name="email" />
            </div>

            <div className="flex w-full gap-4">
                <Button
                    variant={ButtonVariantsEnum.OUTLINED}
                    onClick={() =>
                        dispatch(
                            setUsersModal({ type: "create", value: false }),
                        )
                    }
                    className="cursor-pointer"
                >
                    Ləğv et
                </Button>
                <Button
                    type="submit"
                    className="cursor-pointer"
                    isLoading={addUser.isPending}
                >
                    Yadda saxla
                </Button>
            </div>
        </Form>
    );
};

export default UserAddForm;
