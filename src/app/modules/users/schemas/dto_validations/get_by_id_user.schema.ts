import z from "zod";

export const userSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string().email(),
    image: z.string().url(),
});
