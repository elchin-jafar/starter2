import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/app/hooks/useRedux.ts";
import { setHeaderContent } from "@/app/store/header/headerSlice.ts";
import type { HeaderSliceType } from "../store/header/header.type";

export function useHeaderContent({ title, breadcrumbs }: HeaderSliceType) {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        dispatch(setHeaderContent({ title, breadcrumbs }));
    }, [title, breadcrumbs]);
}
