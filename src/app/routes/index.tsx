import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
import { Navigate, useRoutes, type RouteObject } from "react-router";

const UsersPage = lazy(() => import("@/ui/pages/users"));
const UserDetailsPage = lazy(() => import("@/ui/pages/userDetails"));

const AppRoutes = () => {
    const routesConfig: RouteObject[] = [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/users" replace />,
                },
                {
                    path: "/users",
                    element: <UsersPage />,
                },
                {
                    path: "/user/:id",
                    element: <UserDetailsPage />,
                },
            ],
        },
        {
            path: "*",
            element: <>Not Found</>,
        },
    ];

    const routes = useRoutes(routesConfig);

    return routes;
};

export default AppRoutes;
