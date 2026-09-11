import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRepository } from "../repositories";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const useDeleteUserApi = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => UserRepository.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: RevalidateTags.users.base,
            });
            snackbar(SnackbarStatusEnum.SUCCESS, "User successfully deleted");
        },
    });
};
