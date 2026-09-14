import { RevalidateTags } from "@/data/utils/revalidate_tags";
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
            return Promise.all([
                queryClient.invalidateQueries({
                    queryKey: RevalidateTags.users.base,
                }),
                queryClient.invalidateQueries({
                    queryKey: RevalidateTags.users.byId(id),
                }),
            ]);
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
