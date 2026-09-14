import { RequestStateEnum } from "@/data/enum/request_state.enum";
import { UserDetailsVM } from "./user_details.vm";
import Skeleton from "@/ui/shared/Skeleton";

const UserDetails = () => {
    const { data, requestStateUserDetail } = UserDetailsVM();

    const render = () => {
        switch (requestStateUserDetail) {
            case RequestStateEnum.LOADING:
                return (
                    <div className="flex justify-center mt-8">
                        <Skeleton className="w-sm h-96 rounded-2xl" />
                    </div>
                );
            case RequestStateEnum.EMPTY:
                return <>something went wrong</>;
            case RequestStateEnum.SUCCESS:
                return (
                    <div className="relative top-10 mx-auto w-full max-w-sm pt-0 border-2 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 z-30" />
                        <img
                            src={data?.image}
                            className="relative z-20 aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                            <div className="text-36px500">
                                {data?.firstName} {data?.lastName}
                            </div>
                            <div className="text-18px500">
                                <b>yaş</b> : {data?.age}
                            </div>
                            <div className="text-18px500">
                                <b>e-poçt</b> : {data?.email}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return render();
};

export default UserDetails;
