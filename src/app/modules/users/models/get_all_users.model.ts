import type { BaseMetaModel } from "../../common/models/base_meta.model";

export type UserModel = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    image: string;
};

export type AllUsersModel = {
    users: UserModel[];
    meta: BaseMetaModel;
};
