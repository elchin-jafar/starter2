import { useRequestState } from "@/app/hooks/useRequestState";
import { useGetByIdUserApi } from "@/app/modules/users/api/getByIdUser.api";
import { useParams } from "react-router";

export const UserDetailsVM = () => {
    const { id } = useParams();

    const userId = id || 1;
    const { data, isFetching, isSuccess, isError } = useGetByIdUserApi({
        id: String(userId),
    });

    const requestStateUserDetail = useRequestState({
        isFetching,
        isError,
        isSuccess,
        isEmpty: !data,
    });

    return { data, requestStateUserDetail };
};
