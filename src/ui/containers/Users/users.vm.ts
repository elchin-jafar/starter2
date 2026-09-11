import { useListPage } from "@/app/hooks/useListPage";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
import { useRequestState } from "@/app/hooks/useRequestState";
import { useGetAllUsersApi } from "@/app/modules/users/api/getAllUsers.api";
import { setUsersModal } from "@/app/store/modal";
import { useNavigate } from "react-router";
import type { RowActionType, UsersModalType } from "./users.type";
import { useDeleteUserApi } from "@/app/modules/users/api/deleteUser.api";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { useSearchUsersApi } from "@/app/modules/users/api/searchUsers.api";

export const UsersVM = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const usersStore = useAppSelector((store) => store.modal.users);

    const { delete: del } = usersStore;

    const { searchParams, setSelectedId, handleSearch } = useListPage({
        idParam: "userId",
        isAnyModalOpen: del,
        onDeepLink: (modal) => {
            if (modal === "delete") openModal(modal);
        },
    });

    const page = Number(searchParams.get("page")) || 1;
    const userId = searchParams.get("userId") || "";
    const search = searchParams.get("search") || "";

    const allUsersQuery = useGetAllUsersApi({
        page,
        pageSize: 10,
        enabled: !search,
    });

    const searchUsersQuery = useSearchUsersApi({
        q: search,
        page,
        pageSize: 10,
    });

    const activeQuery = search ? searchUsersQuery : allUsersQuery;
    const { data: usersResponse, isFetching, isError, isSuccess } = activeQuery;

    const deleteUser = useDeleteUserApi({ id: userId });

    const handleDelete = () => {
        deleteUser.mutate(undefined, {
            onSuccess() {
                dispatch(setUsersModal({ type: "delete", value: false }));
            },
            onError(err) {
                snackbar(SnackbarStatusEnum.ERROR, err.message);
            },
        });
    };

    const openModal = (type: UsersModalType) =>
        dispatch(setUsersModal({ type, value: true }));

    // const {
    //     data: usersResponse,
    //     isFetching,
    //     isError,
    //     isSuccess,
    // } = useGetAllUsersApi({
    //     page,
    //     pageSize: 10,
    // });

    const requestStateUsers = useRequestState({
        isFetching,
        isError,
        isSuccess,
        isEmpty: !usersResponse?.users.length,
    });

    const handleRowAction = (type: RowActionType, id: number) => {
        switch (type) {
            case "view":
                navigate(`/user/${id}`);
                return;
            case "delete":
                setSelectedId(id);
                openModal(type);
                return;
            default:
                return;
        }
    };

    const toggleDeleteModal = () => {
        dispatch(setUsersModal({ type: "delete", value: !del }));
    };

    return {
        usersResponse,
        requestStateUsers,
        handleRowAction,
        isDeleteOpen: del,
        toggleDeleteModal,
        handleDelete,
        handleSearch,
    };
};
