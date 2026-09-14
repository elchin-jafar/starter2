import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddUserModel } from "../models/add_user.model";
import { UserRepository } from "../repositories";

export const useAddUserApi = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AddUserModel) => UserRepository.addUser(data),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: RevalidateTags.users.base,
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
