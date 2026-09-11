import { TableContainer } from "@/ui/shared/Table/table_container";
import { UsersVM } from "./users.vm";
import type { TableHeaderType } from "@/ui/shared/Table/table.type";
import type { RowsType } from "./users.type";
import { RowActionButton } from "@/ui/shared/Table";
import DeleteModal from "@/ui/components/DeleteModal";
import Button from "@/ui/shared/Button";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import Input from "@/ui/shared/Input";
import { Search } from "lucide-react";

const Users = () => {
    const {
        usersResponse,
        requestStateUsers,
        handleRowAction,
        isDeleteOpen,
        toggleDeleteModal,
        handleDelete,
        handleSearch,
    } = UsersVM();

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
        {
            id: 5,
            render: (row) => (
                <div className="flex gap-2">
                    <RowActionButton
                        variant="view"
                        onClick={() => handleRowAction("view", row.id)}
                    />
                    <RowActionButton
                        variant="delete"
                        onClick={() => handleRowAction("delete", row.id)}
                    />
                </div>
            ),
        },
    ];
    return (
        <>
            <Input
                name="search"
                className="w-3xl mb-6"
                placeholder="Axtar"
                isDebounce
                onDebounce={handleSearch}
                trailing={
                    <div>
                        <Search />
                    </div>
                }
            />
            {usersResponse && (
                <TableContainer
                    headData={columns}
                    bodyData={usersResponse.users}
                    state={requestStateUsers}
                    pagination={{
                        total: usersResponse.meta.total,
                        perPage: usersResponse.meta.perPage,
                    }}
                />
            )}

            <DeleteModal
                visible={isDeleteOpen}
                setVisible={toggleDeleteModal}
                title="Istifadecini sil"
                description="Bu istifadecini silmek istediyinize eminsiniz?"
                action={
                    <>
                        <Button
                            variant={ButtonVariantsEnum.OUTLINED}
                            onClick={toggleDeleteModal}
                            className="cursor-pointer"
                        >
                            Legv et
                        </Button>
                        <Button
                            variant={ButtonVariantsEnum.DANGER}
                            onClick={handleDelete}
                            className="cursor-pointer"
                        >
                            Sil
                        </Button>
                    </>
                }
            />
        </>
    );
};

export default Users;
