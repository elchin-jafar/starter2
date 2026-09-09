export type CheckboxType<T extends { id: number | string } | null = any> = {
    data?: T;
    name: string;
    value?: boolean;
    className?: string;
    svgClassName?: string;
    label?: string;
    onChange?: any;
    valueType?: "boolean" | "object";
};

export type CheckboxVMType<T extends { id: number | string } | null> = Pick<
    CheckboxType<T>,
    "name" | "value" | "onChange" | "valueType" | "data"
>;
