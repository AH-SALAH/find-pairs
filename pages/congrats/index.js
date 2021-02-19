import AppLayout from "@/layout";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const CongratsComp = dynamic(
    () => import('@/components/CongratsComp'),
    {
        loading: () => <Skeleton title={false} paragraph={{rows: 7}} active />,
        ssr: false
    }
);


const Congrats = () => {

    return (
        <AppLayout>
            <CongratsComp/>
        </AppLayout>
    )
};

export default Congrats;