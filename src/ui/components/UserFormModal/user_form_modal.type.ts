export type UserFormModalType = {
    visible: boolean;
    setVisible: (show: boolean) => void;
    user?: unknown;
    onSubmit: (values: unknown) => void;
};
