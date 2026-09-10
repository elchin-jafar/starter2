import { Outlet } from "react-router";
import Header from "@/ui/containers/Header";
import { Suspense } from "react";

const MainLayout = () => {
    return (
        <div className="overflow-auto w-full flex items-stretch min-h-screen">
            <div
                id="scroll-container"
                className="flex flex-col flex-1 overflow-auto h-screen"
            >
                <Header />
                <div className="grow p-4">
                    <Suspense
                        fallback={
                            <div className="min-h-screen flex items-center justify-center">
                                <>Loading..</>
                            </div>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
