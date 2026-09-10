import type { UpdateUserModel } from "../models/update_user.model";
import type { UpdateUserReqDTO } from "../req_dto/update_user.dto";

export const updateUserMapper = {
    modelToReqDto: (model: UpdateUserModel): UpdateUserReqDTO => {
        const formData = new FormData();
        formData.append("firstName", model.firstName);
        formData.append("lastName", model.lastName);
        formData.append("email", model.email);
        formData.append("age", model.age);

        return formData;
    },
};
