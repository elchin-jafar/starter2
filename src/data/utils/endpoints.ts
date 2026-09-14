export const endpoints = {
    users: {
        getAllUsers: () => "/users",
        getByIdUser: (id: string) => `/users/${id}`,
        addUser: () => "/users/add",
        updateUser: (id: number) => `/users/${id}`,
        deleteUser: (id: string) => `/users/${id}`,
        searchUser: () => "/users/search",
    },
};
