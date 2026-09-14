import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRepository } from "../repositories";

export const useDeleteUserApi = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => UserRepository.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: RevalidateTags.users.base,
            });
        },
    });
};
