import { useAppDispatch } from "@/app/hooks/useRedux";
import { useAddUserApi } from "@/app/modules/users/api/addUser.api";
import { setUsersModal } from "@/app/store/modal";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { snackbar } from "@/ui/shared/Snackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { userFormSchema, type UserFormModel } from "../user.schema";

export const UserAddFormVM = () => {
    const dispatch = useAppDispatch();
    const addUser = useAddUserApi();
    const methods = useForm<UserFormModel>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            email: "",
        },
    });

    const onSubmit = (data: UserFormModel) => {
        addUser.mutate(data, {
            onSuccess() {
                dispatch(setUsersModal({ type: "create", value: false }));
                snackbar(SnackbarStatusEnum.SUCCESS, "İstifadəçi əlavə edildi");
            },
        });
    };

    const onError = (error: FieldErrors<UserFormModel>) => {
        snackbar(SnackbarStatusEnum.ERROR, "Xəta baş verdi");
        console.log(error);
    };

    const submitHandler = methods.handleSubmit(onSubmit, onError);

    return { addUser, dispatch, methods, submitHandler };
};
