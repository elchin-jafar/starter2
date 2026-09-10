import { baseMetaSchema } from "@/app/modules/common/schemas/base_meta.schema";
import z from "zod";

const userSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string().email(),
    image: z.string().url(),
});

export const allUsersSchema = baseMetaSchema.extend({
    users: z.array(userSchema),
});
