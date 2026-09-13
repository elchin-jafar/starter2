import type { UserFormValues } from "@/app/modules/users/schemas/dto_validations/user_form.schema";

export type UserFormType = {
    formId: string;
    defaultValues?: Partial<UserFormValues>;
    onSubmit: (values: UserFormValues) => void;
};
