export type RowsType = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    image: string;
};

export type RowActionType = "view" | "delete" | "edit";

export type UsersModalType = "create" | "edit" | "delete";
