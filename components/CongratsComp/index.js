import Image from "next/image";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { StyledCongratsComp } from "./StyledCongratsComp";
import { m as motion } from "framer-motion";
import { scaleOut } from "@/animation/scale";

const CongratsComp = ({ subTitle = '', handleFinish = false }) => {

    const router = useRouter();

    const [imgs] = useState([
        '/assets/img/confetti-icon.png',
        '/assets/img/wininternet.gif'
    ]);

    const handleBack = () => {
        if (handleFinish) handleFinish();
        else router.push('/');
    };

    const getRandomImg = useCallback(
        () => {
            return imgs[Math.floor(Math.random() * imgs.length)];
        },
        [],
    );

    return (
        <motion.div initial="init" animate="animate" variants={scaleOut} exit="exit" key="congrats">
            <StyledCongratsComp>
                <Image
                    key="congrats-img"
                    className="bg"
                    src={'/assets/img/confetti-bg.png'}
                    layout="fill"
                />
                <Result
                    status="success"
                    title="CONGRATULATION"
                    subTitle={subTitle}
                    extra={[
                        <Image
                            key="congrats-img"
                            src={getRandomImg()}
                            layout="fixed"
                            width={200}
                            height={200}
                        />,
                        <Button
                            type="primary"
                            key="completed"
                            shape="round"
                            onClick={handleBack}
                            style={{ width: 150, margin: '1em auto' }}
                        >
                            Play Again
                    </Button>,
                    ]}
                    style={{ marginTop: '-2em', fontFamily: 'cursive' }}
                    className="result"
                />
            </StyledCongratsComp>
        </motion.div>
    )
};

export default CongratsComp;