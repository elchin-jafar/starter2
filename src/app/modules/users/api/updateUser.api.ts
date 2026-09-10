import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { snackbar } from "@/ui/shared/Snackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserModel } from "../models/update_user.model";
import { UserRepository } from "../repositories";

type UpdateUserVars = { id: number; data: UpdateUserModel };

export const useUpdateUserApi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateUserVars) =>
            UserRepository.updateUser(id, data),
        onSuccess: (_res, { id }) => {
            snackbar(SnackbarStatusEnum.SUCCESS, "User updated");
            return Promise.all([
                queryClient.invalidateQueries({
                    queryKey: RevalidateTags.users.base,
                }),
                queryClient.invalidateQueries({
                    queryKey: RevalidateTags.users.byId(id),
                }),
            ]);
        },
        onError: () => {
            snackbar(SnackbarStatusEnum.ERROR, "Could not update user");
        },
    });
};
