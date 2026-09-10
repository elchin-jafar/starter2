import { type BreadCrumbType } from "@/ui/shared/Breadcrumbs/breadcrumbs.type";

export type HeaderSliceType = {
    title?: string | null;
    breadcrumbs?: BreadCrumbType[] | null;
};
