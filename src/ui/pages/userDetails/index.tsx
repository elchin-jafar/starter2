import { useHeaderContent } from "@/app/hooks/userHeaderContent";

const UserDetailsPage = () => {
    useHeaderContent({
        breadcrumbs: [
            { id: 1, name: "İstifadəçilər", link: "/users" },
            { id: 2, name: "İstifadəçi məlumatları", link: "/users/:id" },
        ],
    });
    return <>User details by id</>;
};

export default UserDetailsPage;
