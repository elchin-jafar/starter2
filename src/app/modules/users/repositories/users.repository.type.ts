import type { AddUserModel } from "../models/add_user.model";
import type { AllUsersModel, UserModel } from "../models/get_all_users.model";
import type { UpdateUserModel } from "../models/update_user.model";
import type { GetAllUsersParams } from "../services/get_all_users.service";
import type { SearchUsersParams } from "../services/search_users.service";

export type UserRepositoryType = {
    getAllUsers(params: GetAllUsersParams): Promise<AllUsersModel>;
    getByIdUser(id: string): Promise<UserModel>;
    addUser(data: AddUserModel): Promise<unknown>;
    updateUser(id: number, data: UpdateUserModel): Promise<unknown>;
    deleteUser(id: string): Promise<unknown>;
    searchUser(params: SearchUsersParams): Promise<AllUsersModel>;
};
