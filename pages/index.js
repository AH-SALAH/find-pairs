import AppLayout from "@/layout";
import { StyledHome } from "@/globalStyledComponents/Home";
import { Row, Col, Skeleton } from "antd";
import dynamic from 'next/dynamic';
import { wrapper } from '@/redux/store';
import { resizeImgsIfNotExist } from "@/utils/processImages";
// import { useState } from "react";
// import { END } from 'redux-saga';
// import { resetStoreAction } from "@/redux/actions/reset";

const CardPanel = dynamic(
    () => import('@/components/CardPanel'),
    {
        loading: () => <Skeleton title={false} paragraph={{ rows: 10 }} active />,
        ssr: false
    }
);
const InfoPanel = dynamic(
    () => import('@/components/InfoPanel'),
    {
        loading: () => <Skeleton paragraph={{ rows: 7 }} active />,
        ssr: false
    }
);

const Home = ({ imgs = [] }) => {

    return (
        <AppLayout>
            <StyledHome>
                <div className={'container'}>
                    <main className={'main'}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ width: '100%' }}>
                            <Col span={24} md={17} xs={{ order: 2 }} sm={{ order: 1 }} style={{ marginBottom: '1em' }}>
                                <CardPanel
                                    imgs={imgs}
                                />
                            </Col>
                            <Col span={24} md={7} xs={{ order: 1 }} sm={{ order: 2 }} style={{ marginBottom: '1em' }}>
                                <InfoPanel />
                            </Col>
                        </Row>
                    </main>
                </div>
            </StyledHome>
        </AppLayout>
    )
};

// This also gets called at build time
export const getStaticProps = wrapper.getStaticProps(async ({ params, store }) => {
    try {
        // const res = await fetch(`https://picsum.photos/v2/list/?size=200&page=${params?.page || 1}&limit=${params?.limit || 21}`);
        const res = await fetch(`http://www.splashbase.co/api/v1/images/search?images_only=true&query=${params?.query || 'street'}`);
        const json = await res.json();
        // we want just 21
        const data = (json.images || json)?.slice(0, 21);

        let imgs = await resizeImgsIfNotExist(data);

        // prepare data as needed [data, new data copy] = total pairs of [42] needed 
        const preparedData = [...imgs, ...imgs]
            .map((img, i) => { return { ...img, order: i } })
            .sort((a, b) => a.id - b.id);

        // if (!store.getState().score.scoreValue) {
        //   store.dispatch(resetStoreAction())
        //   store.dispatch(END);
        // }

        // await store.sagaTask.toPromise();

        return {
            props: { imgs: preparedData },
            revalidate: 1
        };
    }
    catch (error) {
        console.log(error);
        return { props: { imgs: [] } };
    }

});

export default Home;