import z from "zod";

export const baseMetaSchema = z.object({
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});
