import type { UserModel } from "../models/get_by_id_user.model";
import type { UserResDTO } from "../res_dto/get_by_id_user.dto";

export const getByIdUserMapper = {
    resDtoToModel: (dto: UserResDTO): UserModel => {
        return {
            id: dto.id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            email: dto.email,
            image: dto.image,
        };
    },
};
