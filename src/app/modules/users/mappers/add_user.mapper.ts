import type { AddUserModel } from "../models/add_user.model";
import type { AddUserReqDTO } from "../req_dto/add_user.dto";

export const addUserMapper = {
    modelToReqDto: (model: AddUserModel): AddUserReqDTO => {
        const formData = new FormData();
        formData.append("firstName", model.firstName);
        formData.append("lastName", model.lastName);
        formData.append("age", model.age);
        formData.append("email", model.email);
        return formData;
    },
};
