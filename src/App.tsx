import { ToastContainer } from "react-toastify";
import AppRoutes from "./app/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-full w-full">
                <AppRoutes />
            </div>
            <ToastContainer position="top-right" />
        </QueryClientProvider>
    );
}

export default App;
