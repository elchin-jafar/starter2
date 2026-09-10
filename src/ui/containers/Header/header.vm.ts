import { useAppSelector } from "@/app/hooks/useRedux";

export const HeaderVM = () => {
    const header = useAppSelector((store) => store.header);

    return { header };
};
