import { useHeaderContent } from "@/app/hooks/userHeaderContent";
import Users from "@/ui/containers/Users";

const UsersPage = () => {
    useHeaderContent({
        breadcrumbs: [{ id: 1, name: "Users", link: "/users" }],
    });

    return (
        <>
            <Users />
        </>
    );
};

export default UsersPage;
