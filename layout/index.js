import { Layout } from 'antd';
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Head from 'next/head';
import FrMotion from '@/animation';
import { AnimatePresence, m as motion } from "framer-motion";
import { useRouter } from 'next/router';
import { exitAnime } from "@/animation/exit";

const AppLayout = props => {
    const { title } = props;
    const router = useRouter();

    return (
        <FrMotion>
            <AnimatePresence exitBeforeEnter>
                <Layout className="layout">
                    <Head>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <title>{title ? 'Find The Pairs | ' + title : 'Find The Pairs'}</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Header title={title} />
                    <motion.div initial="init" animate="animate" exit="exit" variants={exitAnime} key={router.route}>
                        <Content {...props} />
                    </motion.div>
                    <Footer />
                </Layout>
            </AnimatePresence>
        </FrMotion>
    )
};

export default AppLayout;