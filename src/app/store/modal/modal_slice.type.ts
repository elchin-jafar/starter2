export type ModalActionType = {
    create: boolean;
    edit: boolean;
    delete: boolean;
    view: boolean;
};

export type ModalSliceType = {
    users: Omit<ModalActionType, "view">;
};

export type ActionType = "create" | "edit" | "delete" | "view";
