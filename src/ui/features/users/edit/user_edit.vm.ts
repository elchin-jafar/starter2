import { useAppDispatch } from "@/app/hooks/useRedux";
import { useRequestState } from "@/app/hooks/useRequestState";
import { useGetByIdUserApi } from "@/app/modules/users/api/getByIdUser.api";
import { useUpdateUserApi } from "@/app/modules/users/api/updateUser.api";
import { setUsersModal } from "@/app/store/modal";
import { RequestStateEnum } from "@/data/enum/request_state.enum";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { snackbar } from "@/ui/shared/Snackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useSearchParams } from "react-router";
import { userFormSchema, type UserFormModel } from "../user.schema";

export const UserEditFormVM = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId") || "";
    const editUser = useUpdateUserApi();
    const {
        data: user,
        isFetching,
        isError,
        isSuccess,
    } = useGetByIdUserApi({ id: userId });

    const requestStateUser = useRequestState({
        isFetching,
        isError,
        isSuccess,
        isEmpty: !!user && !Object.keys(user).length,
    });

    const methods = useForm<UserFormModel>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            email: "",
        },
    });

    useEffect(() => {
        if (requestStateUser !== RequestStateEnum.LOADING) {
            methods.reset({
                firstName: user?.firstName,
                lastName: user?.lastName,
                age: String(user?.age),
                email: user?.email,
            });
        }
    }, [methods, requestStateUser, user]);

    const onSubmit = (data: UserFormModel) => {
        editUser.mutate(
            { id: Number(userId), data },
            {
                onSuccess() {
                    dispatch(setUsersModal({ type: "edit", value: false }));
                    snackbar(SnackbarStatusEnum.SUCCESS, "Düzəliş edildi");
                },
            },
        );
    };

    const onError = (error: FieldErrors<UserFormModel>) => {
        snackbar(SnackbarStatusEnum.ERROR, "Xəta baş verdi");
        console.log(error);
    };

    const submitHandler = methods.handleSubmit(onSubmit, onError);

    return {
        dispatch,
        methods,
        submitHandler,
        editUser,
    };
};
