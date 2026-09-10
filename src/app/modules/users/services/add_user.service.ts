import axiosInstance from "@/app/lib/axios.config";
import { endpoints } from "@/data/utils/endpoints";
import type { AddUserReqDTO } from "../req_dto/add_user.dto";

export const addUserService = async (body: AddUserReqDTO) => {
    const res = await axiosInstance.post(endpoints.users.addUser(), body);

    return res.data;
};
