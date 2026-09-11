import { useMemo } from "react";
import { RequestStateEnum } from "@/data/enum/request_state.enum";

type UseRequestStateArgs = {
    isFetching: boolean;
    isError: boolean;
    isSuccess: boolean;
    isEmpty: boolean;
};

export const useRequestState = ({
    isFetching,
    isError,
    isSuccess,
    isEmpty,
}: UseRequestStateArgs) =>
    useMemo(() => {
        if (isFetching) return RequestStateEnum.LOADING;
        if (isError || isEmpty) return RequestStateEnum.EMPTY;
        if (isSuccess && !isEmpty) return RequestStateEnum.SUCCESS;
    }, [isError, isFetching, isSuccess, isEmpty]);
