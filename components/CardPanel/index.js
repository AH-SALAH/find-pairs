import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Row, Card, Col, Skeleton } from "antd";
import { shuffle } from "@/utils/shuffle";
import { Flipper, Flipped } from "react-flip-toolkit";
import CardItem from "./CardItem";
import { checkLoadedImgs } from "@/utils/imageLoaded";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "@/redux/actions/score";
import { addTries } from "@/redux/actions/tries";
import { restart as restartAction } from "@/redux/actions/restart";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { selectScoreValue } from "@/redux/selectors/score";
import picsList from "@/utils/staticData";
import { selectTriesValue } from "@/redux/selectors/tries";
import { selectSizeValue } from "@/redux/selectors/size";
import { selectRestartValue } from "@/redux/selectors/restart";
import { m as motion } from "framer-motion";
import { scaleOut } from "@/animation/scale";
// import { resetStore } from "@/redux/actions/reset";

const CustomModal = dynamic(
    () => import('@/components/CustomModal'),
    {
        // loading: () => <Skeleton title={false} paragraph={false} avatar={{ shape: 'square' }} active />,
        // ssr: true
    }
);

const CongratsComp = dynamic(
    () => import('@/components/CongratsComp'),
    {
        loading: () => <Skeleton title={false} paragraph={{ rows: 7 }} active />,
        // ssr: false
    }
);

const CardPanel = ({ imgs = [] }) => {

    const router = useRouter();

    const dispatch = useDispatch();
    const scoreValue = useSelector(useMemo(selectScoreValue, []));
    const triesValue = useSelector(useMemo(selectTriesValue, []));
    const sizeValue = useSelector(useMemo(selectSizeValue, []));
    const restart = useSelector(useMemo(selectRestartValue, []));

    const cardsRefs = useRef([]);
    const imgsRef = useRef((imgs.length && imgs) || picsList);

    const [photos, setPhotos] = useState(shuffle(imgsRef.current.slice(0, sizeValue * 2)));
    const [loading, setLoading] = useState(true);
    const [clickCountHandler, setClickCountHandler] = useState([]);
    const [flippedBackCards, setFlippedBackCards] = useState([]);
    const [bulkDoneFlippedBack, setBulkDoneFlippedBack] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // append items dyn upon size change
    const addedItems = useMemo(() => {
        return shuffle([
            ...imgsRef.current
                .slice(0, sizeValue * 2)
        ])
    }, [sizeValue, restart]);

    // calc card's cols width dyn upon size change
    const calcCols = useMemo(() => {
        return (
            Math.ceil(24 / (sizeValue / 2)) % 2
                && Math.ceil(24 / (sizeValue / 2)) > 4
                ?
                Math.ceil(24 / (sizeValue / 2)) + 1
                :
                Math.ceil(24 / (sizeValue / 2)) < 4
                    ?
                    Math.ceil(24 / (sizeValue / 2)) + 1
                    :
                    Math.ceil(24 / (sizeValue / 2))
        )
    }, [sizeValue]);

    const checkValuesChange = useCallback(
        () => {
            if (addedItems.length && photos?.length !== sizeValue * 2) {
                setLoading(true); // to recheck imgLoaded on sizeChange
                if (!restart) dispatch(restartAction(true));
            }
            applyReset();
            console.log("imgsRef: ", imgsRef.current, "photos: ", photos, "addedItems: ", addedItems);
        }
        ,
        [sizeValue, restart],
    )

    // update on size change
    useEffect(() => {
        if (
            addedItems.length
            &&
            photos?.length !== sizeValue * 2
            &&
            imgsRef.current?.length >= sizeValue * 2
            ||
            restart
        ) {
            checkValuesChange();
        }
    }, [sizeValue, restart]);

    useEffect(() => {
        // after elements are rendered start img load chk
        if (cardsRefs.current?.length && loading) {
            checkLoadedImage(cardsRefs.current);
        }
    }, [cardsRefs.current?.length, loading]);

    useEffect(() => {
        // all have flipped back, then set restart = false & empty its caches
        if (bulkDoneFlippedBack.length === photos.length) {
            dispatch(restartAction(false));
            setBulkDoneFlippedBack([]);
        }
    }, [bulkDoneFlippedBack]);

    useEffect(() => {
        /**  already finished temp per pairs flipping action, then 
        * - update tries
        * - see if update score
        * - empty caches
        */
        if (flippedBackCards.length >= 2) {

            // update Tries
            dispatch(addTries(1));

            // update Score
            if (matchedCards.length && clickCountHandler[0] === clickCountHandler[1]) {
                dispatch(addScore(1));
            }

            // if all matched
            if (matchedCards.length === photos.length) {
                // congrats
                router.push('/', 'congrats');
                setOpenModal(true);
            }

            // empty caches
            setFlippedBackCards([]);
            setClickCountHandler([]);
        }

    }, [flippedBackCards]);


    const checkLoadedImage = useCallback(async imgs => {
        if (!loading) setLoading(true);
        await checkLoadedImgs(imgs);
        setLoading(false);
    }, [loading]);

    const handleFinish = async () => {
        setOpenModal(false);
        await router.push('/');
        dispatch(restartAction(true));
        applyReset();
    };

    const applyReset = () => {
        setPhotos([...addedItems]);
        setMatchedCards([]);
        setClickCountHandler([]);
        setFlippedBackCards([]);
        if (triesValue) dispatch(addTries(0));
        if (scoreValue) dispatch(addScore(0));
    };

    const handleModalClose = async () => {
        setOpenModal(false);
        dispatch(restartAction(true));
        applyReset();
        router.push('/congrats');
    };

    const renderPhotos = useMemo(() => {
        return photos.map((img, i) => {
            let k = img.order ?? i;
            return (
                <Flipped key={k} flipId={'flipped-item-' + k}>
                    <Col
                        span={24}
                        xs={12}
                        sm={8}
                        md={calcCols}
                        ref={node => cardsRefs.current[i] = node}
                        style={{
                            marginBottom: 24,
                            position: 'relative'
                        }}
                    >
                        <CardItem
                            key={k}
                            img={img}
                            i={i}
                            calcColsNum={calcCols}
                            loading={loading}
                            setClickCountHandler={setClickCountHandler}
                            clickCountHandler={clickCountHandler}
                            setFlippedBackCards={setFlippedBackCards}
                            setMatchedCards={setMatchedCards}
                            setBulkDoneFlippedBack={setBulkDoneFlippedBack}
                        />
                    </Col>
                </Flipped>
            )
        }
        )
    }, [loading, clickCountHandler]);

    return (
        <>
            <motion.div initial="init" animate="animate" variants={scaleOut} exit="exit" key="modal">
                <Card style={{ background: 'none' }}>
                    <Card.Grid style={{ boxShadow: 'none', width: '100%', padding: '0 24px' }}>
                        <Flipper flipKey={'card-' + Math.random()}>
                            <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ height: 'auto' }}>
                                {
                                    renderPhotos
                                }
                            </Row>
                        </Flipper>
                    </Card.Grid>
                </Card>
                <CustomModal visible={openModal} closable={true} onCancel={handleModalClose}>
                    <CongratsComp
                        subTitle={`You Scored ${scoreValue} out of ${sizeValue} Through ${triesValue} tries`}
                        handleFinish={handleFinish}
                    />
                </CustomModal>
            </motion.div>
        </>
    )
}

export default CardPanel;