import type { AllUsersModel } from "../models/get_all_users.model";
import type { AllUsersResDTO } from "../res_dto/get_all_users.dto";

export const getAllUsersMapper = {
    resDtoToModel: (dto: AllUsersResDTO): AllUsersModel => {
        return {
            users: dto.users.map((user) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                image: user.image,
            })),
            total: dto.total,
            skip: dto.skip,
            limit: dto.limit,
        };
    },
};
