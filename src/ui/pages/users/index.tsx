import { useHeaderContent } from "@/app/hooks/userHeaderContent";

const UsersPage = () => {
    useHeaderContent({
        breadcrumbs: [{ id: 1, name: "Users", link: "/users" }],
    });
    return <>Users Main Page</>;
};

export default UsersPage;
