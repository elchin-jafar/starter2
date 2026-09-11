import { Link } from "react-router";
import { cn } from "@/app/utils/cn";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsType } from "./breadcrumbs.type";

const Breadcrumbs = ({ crumbs }: BreadcrumbsType) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center flex-wrap gap-2">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    const isLink = !!crumb.link && !isLast;

                    const itemClass = cn(
                        "text-14px400",
                        isLast ? "text-slate-100" : "text-slate-400",
                        !isLink && !isLast && "cursor-default",
                    );
                    return (
                        <li key={crumb.id} className="flex items-center gap-2">
                            {isLink ? (
                                <Link
                                    to={crumb.link!}
                                    className={cn(
                                        itemClass,
                                        "hover:text-slate-200",
                                    )}
                                >
                                    {crumb.name}
                                </Link>
                            ) : (
                                <span
                                    className={itemClass}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {crumb.name}
                                </span>
                            )}

                            {!isLast && (
                                <ChevronRight
                                    className={cn(
                                        "size-4",
                                        index === crumbs.length - 2
                                            ? "text-slate-300"
                                            : "text-slate-600",
                                    )}
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
