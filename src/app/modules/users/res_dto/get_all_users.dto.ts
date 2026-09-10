import type z from "zod";
import type { allUsersSchema } from "../schemas/dto_validations/get_all_users.schema";

export type AllUsersResDTO = z.infer<typeof allUsersSchema>;
