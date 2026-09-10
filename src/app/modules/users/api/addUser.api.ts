import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { snackbar } from "@/ui/shared/Snackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddUserModel } from "../models/add_user.model";
import { UserRepository } from "../repositories";

export const useAddUserApi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AddUserModel) => UserRepository.addUser(data),
        onSuccess: () => {
            snackbar(SnackbarStatusEnum.SUCCESS, "User created");
            return queryClient.invalidateQueries({
                queryKey: RevalidateTags.users.base,
            });
        },
        onError: () => {
            snackbar(SnackbarStatusEnum.ERROR, "Could not create user");
        },
    });
};
