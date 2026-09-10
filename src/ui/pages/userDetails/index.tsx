import { useHeaderContent } from "@/app/hooks/userHeaderContent";

const UserDetailsPage = () => {
    useHeaderContent({
        breadcrumbs: [
            { id: 1, name: "Users", link: "/users" },
            { id: 2, name: "User details", link: "/users/:id" },
        ],
    });
    return <>User details by id</>;
};

export default UserDetailsPage;
