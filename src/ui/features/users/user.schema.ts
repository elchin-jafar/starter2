import z from "zod";

const nameRegex = /^[\p{L}\s'-]+$/u;

export const userFormSchema = z.object({
    firstName: z
        .string()
        .min(1, "Ad tələb olunur")
        .regex(nameRegex, "Ad rəqəm və ya simvol ola bilməz"),
    lastName: z
        .string()
        .min(1, "Soyad tələb olunur")
        .regex(nameRegex, "Soyad rəqəm və ya simvol ola bilməz"),
    age: z
        .string()
        .min(1, "Yaş tələb olunur")
        .superRefine((v, ctx) => {
            const num = Number(v);
            if (isNaN(num)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Yaş rəqəm olmalıdır",
                });
                return;
            }
            if (num > 123) {
                ctx.addIssue({
                    code: "custom",
                    message: "Yaşı düzgün daxil edin (Max 123)",
                });
            }
        }),
    email: z.email("E-poçt tələb olunur"),
});

export type UserFormModel = z.infer<typeof userFormSchema>;
