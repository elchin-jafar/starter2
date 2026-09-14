import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { useQuery } from "@tanstack/react-query";
import { UserRepository } from "../repositories";

export const useGetByIdUserApi = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: RevalidateTags.users.byId(Number(id)),
        queryFn: () => UserRepository.getByIdUser(id),
        enabled: !!id,
    });
};
