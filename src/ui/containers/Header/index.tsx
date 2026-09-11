import { HeaderVM } from "./header.vm";
import Breadcrumbs from "@/ui/shared/Breadcrumbs";

const Header = () => {
    const { header } = HeaderVM();

    return (
        <header className="sticky top-0 z-30 w-full bg-slate-900 border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
            <div className="h-14 px-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="h-5 w-px bg-gracy-200 dark:bg-gray-800 shrink-0" />

                    {header.title && (
                        <h1 className="text-24px700 text-gray-900 dark:text-gray-100 truncate">
                            {header.title}
                        </h1>
                    )}

                    {header.breadcrumbs && (
                        <div className="min-w-0">
                            <Breadcrumbs crumbs={header.breadcrumbs} />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3"></div>
            </div>
        </header>
    );
};

export default Header;
