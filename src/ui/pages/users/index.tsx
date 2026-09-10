import { useSearchParams } from "react-router";
import { useHeaderContent } from "@/app/hooks/userHeaderContent";
import { useGetAllUsersApi } from "@/app/modules/users/api/getAllUsers.api";
import { RequestStateEnum } from "@/data/enum/request_state.enum";
import type { TableHeaderType } from "@/ui/shared/Table/table.type";
import { TableContainer } from "@/ui/shared/Table/table_container";
import { useMemo } from "react";

type RowsType = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    image: string;
};

const UsersPage = () => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { data, isPending, isError } = useGetAllUsersApi({
        page,
        pageSize: 10,
    });

    const requestStateContact = useMemo(() => {
        if (isPending) return RequestStateEnum.LOADING;
        if (isError || !data?.users.length) return RequestStateEnum.EMPTY;
        return RequestStateEnum.SUCCESS;
    }, [isPending, isError, data]);

    console.log("data", data);

    const columns: TableHeaderType<RowsType>[] = [
        {
            id: 1,
            key: ["firstName"],
            name: "Ad",
        },
        {
            id: 2,
            key: ["lastName"],
            name: "Soyad",
        },
        {
            id: 3,
            key: ["age"],
            name: "Yas",
        },
        {
            id: 4,
            key: ["email"],
            name: "Email",
        },
    ];

    useHeaderContent({
        breadcrumbs: [{ id: 1, name: "Users", link: "/users" }],
    });

    return (
        <>
            <h1>Users</h1>

            {data && (
                <TableContainer
                    headData={columns}
                    bodyData={data.users}
                    state={requestStateContact}
                    pagination={{
                        total: data.meta.total,
                        perPage: data.meta.perPage,
                    }}
                />
            )}
        </>
    );
};

export default UsersPage;
