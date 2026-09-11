import type { ReactNode } from "react";

export type DeleteModalType = {
    visible: boolean;
    setVisible: (show: boolean) => void;
    title: string;
    description: ReactNode;
    action: ReactNode;
    titleIcon?: ReactNode;
    subtitle?: string;
};
