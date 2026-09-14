import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import DeleteModal from "@/ui/components/DeleteModal";
import UserAddModal from "@/ui/containers/Users/modals/add";
import UserEditModal from "@/ui/containers/Users/modals/edit";
import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";
import { RowActionButton } from "@/ui/shared/Table";
import type { TableHeaderType } from "@/ui/shared/Table/table.type";
import { TableContainer } from "@/ui/shared/Table/table_container";
import { Search, UserPlus } from "lucide-react";
import type { RowsType } from "./users.type";
import { UsersVM } from "./users.vm";

const Users = () => {
    const {
        usersResponse,
        requestStateUsers,
        handleRowAction,
        isCreateOpen,
        isEditOpen,
        isDeleteOpen,
        toggleModal,
        handleDelete,
        handleSearch,
        openModal,
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
                        variant="edit"
                        onClick={() => handleRowAction("edit", row.id)}
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
            <div className="flex gap-2">
                <Input
                    name="search"
                    className="w-auto mb-6"
                    placeholder="Axtar"
                    isDebounce
                    onDebounce={handleSearch}
                    trailing={<Search />}
                />
                <Button
                    className="w-auto cursor-pointer"
                    onClick={() => openModal("create")}
                >
                    <UserPlus />
                </Button>
            </div>
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

            <UserAddModal
                visible={isCreateOpen}
                setVisible={() => toggleModal("create")}
            />

            <UserEditModal
                visible={isEditOpen}
                setVisible={() => toggleModal("edit")}
            />

            <DeleteModal
                visible={isDeleteOpen}
                setVisible={() => toggleModal("delete")}
                title="Istifadecini sil"
                description="Bu istifadecini silmek istediyinize eminsiniz?"
                action={
                    <>
                        <Button
                            variant={ButtonVariantsEnum.OUTLINED}
                            onClick={() => toggleModal("delete")}
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
