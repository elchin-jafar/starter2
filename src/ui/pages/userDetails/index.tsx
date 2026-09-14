import { useHeaderContent } from "@/app/hooks/userHeaderContent";
import UserDetails from "@/ui/containers/UserDetails";

const UserDetailsPage = () => {
    useHeaderContent({
        breadcrumbs: [
            { id: 1, name: "İstifadəçilər", link: "/users" },
            { id: 2, name: "İstifadəçi məlumatları", link: "/users/:id" },
        ],
    });
    return <UserDetails />;
};

export default UserDetailsPage;
