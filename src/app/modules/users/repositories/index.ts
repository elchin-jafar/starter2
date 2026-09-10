import { addUserMapper } from "../mappers/add_user.mapper";
import { getAllUsersMapper } from "../mappers/get_all_users.mapper";
import { getByIdUserMapper } from "../mappers/get_by_id_user.mapper";
import { updateUserMapper } from "../mappers/update_user.mapper";
import { addUserService } from "../services/add_user.service";
import { deleteUserService } from "../services/delete_user.service";
import { getAllUsersService } from "../services/get_all_users.service";
import { getByIdUserService } from "../services/get_by_id_user.service";
import { searchUserService } from "../services/search_users.service";
import { updateUserService } from "../services/update_user.service";
import type { UserRepositoryType } from "./users.repository.type";

export const UserRepository: UserRepositoryType = {
    async getAllUsers(params) {
        const users = await getAllUsersService(params);
        return getAllUsersMapper.resDtoToModel(users);
    },
    async getByIdUser(id) {
        const user = await getByIdUserService(id);
        return getByIdUserMapper.resDtoToModel(user);
    },
    async addUser(data) {
        const mappedUser = addUserMapper.modelToReqDto(data);
        return await addUserService(mappedUser);
    },
    async updateUser(id, data) {
        const mappedUser = updateUserMapper.modelToReqDto(data);
        return await updateUserService(id, mappedUser);
    },
    async deleteUser(id) {
        return await deleteUserService({ id });
    },
    async searchUser(params) {
        const users = await searchUserService(params);
        return getAllUsersMapper.resDtoToModel(users);
    },
};
