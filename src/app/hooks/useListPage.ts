import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";

type UseListPageArgs = {
    idParam: string;
    isAnyModalOpen: boolean;
    onDeepLink: (modal: string, id: string) => void;
};

export const useListPage = ({
    idParam,
    isAnyModalOpen,
    onDeepLink,
}: UseListPageArgs) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const onDeepLinkRef = useRef(onDeepLink);
    onDeepLinkRef.current = onDeepLink;

    const listQuery = useMemo(() => {
        const params = new URLSearchParams(searchParams);
        params.delete(idParam);
        params.delete("openModal");
        const qs = params.toString();
        return qs ? `?${qs}` : "";
    }, [searchParams, idParam]);

    const setSelectedId = (id: number) => {
        setSearchParams((params: URLSearchParams) => {
            params.set(idParam, id.toString());
            return params;
        });
    };

    const handleSearch = (val: string) => {
        setSearchParams((params: URLSearchParams) => {
            params.delete("page");
            val ? params.set("search", val) : params.delete("search");
            return params;
        });
    };

    useEffect(() => {
        const id = searchParams.get(idParam);
        const openModal = searchParams.get("openModal");

        if (!id || !openModal) return;

        onDeepLinkRef.current(openModal, id);

        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                next.delete("openModal");
                return next;
            },
            { replace: true },
        );
    }, [searchParams, setSearchParams, idParam]);

    const wasAnyOpenRef = useRef(false);

    useEffect(() => {
        const openModal = searchParams.get("openModal");
        if (openModal) return;

        if (wasAnyOpenRef.current && !isAnyModalOpen) {
            setSearchParams(
                (params) => {
                    params.delete(idParam);
                    return params;
                },
                { replace: true },
            );
        }

        wasAnyOpenRef.current = isAnyModalOpen;
    }, [isAnyModalOpen, searchParams, setSearchParams, idParam]);

    return {
        searchParams,
        setSearchParams,
        listQuery,
        setSelectedId,
        handleSearch,
    };
};

export const useResetPageWhenEmpty = (itemCount?: number) => {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (itemCount !== undefined && itemCount < 1) {
            setSearchParams((params) => {
                params.delete("page");
                return params;
            });
        }
    }, [itemCount, setSearchParams]);
};
