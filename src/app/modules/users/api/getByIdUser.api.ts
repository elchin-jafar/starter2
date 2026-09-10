import { useQuery } from "@tanstack/react-query";
import { UserRepository } from "../repositories";
import { RevalidateTags } from "@/data/utils/revalidate_tags";

export const useGetByIdUserApi = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: RevalidateTags.users.byId(id),
        queryFn: () => UserRepository.getByIdUser(id),
        enabled: !!id,
    });
};
