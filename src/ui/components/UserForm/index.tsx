import { useEffect } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import Input from "@/ui/shared/Input";
import {
    UserFormSchema,
    type UserFormValues,
} from "@/app/modules/users/schemas/dto_validations/user_form.schema";
import type { UserFormType } from "./user_form.type";

const userFormResolver: Resolver<UserFormValues> = async (values) => {
    const result = UserFormSchema.safeParse(values);

    if (result.success) {
        return { values: result.data, errors: {} };
    }

    const errors = result.error.issues.reduce(
        (acc, issue) => {
            acc[issue.path.join(".")] = {
                type: issue.code,
                message: issue.message,
            };
            return acc;
        },
        {} as Record<string, { type: string; message: string }>,
    );

    return { values: {}, errors };
};

const UserForm = ({ formId, defaultValues, onSubmit }: UserFormType) => {
    const methods = useForm<UserFormValues>({
        resolver: userFormResolver,
        defaultValues,
    });

    useEffect(() => {
        if (defaultValues) methods.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues]);

    return (
        <FormProvider {...methods}>
            <form
                id={formId}
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <Input name="firstName" label="Ad" />
                <Input name="lastName" label="Soyad" />
                <Input name="age" label="Yas" type="number" />
                <Input name="email" label="Email" />
            </form>
        </FormProvider>
    );
};

export default UserForm;
