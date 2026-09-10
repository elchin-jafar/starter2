import type { AllUsersModel } from "../models/get_all_users.model";
import type { AllUsersResDTO } from "../res_dto/get_all_users.dto";

export const getAllUsersMapper = {
    resDtoToModel: (dto: AllUsersResDTO): AllUsersModel => {
        const perPage = dto.limit || 1;
        const page = Math.floor(dto.skip / perPage) + 1;
        const totalPages = Math.ceil(dto.total / perPage);

        return {
            users: dto.users.map((user) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                image: user.image,
            })),
            meta: {
                page,
                perPage,
                total: dto.total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    },
};
