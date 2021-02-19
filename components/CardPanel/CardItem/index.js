import QuestionOutlined from "@ant-design/icons/QuestionOutlined";
import { Avatar, Image, Skeleton } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StyledAvatar } from "./StyledCardItem";
import useIsMounted from "@/hooks/useIsMounted";
import { execAfterTime } from "@/utils/execAfterTime";
import { useSelector } from "react-redux";
import { selectRestartValue } from "@/redux/selectors/restart";
import { selectSizeValue } from "@/redux/selectors/size";

const CardItem = memo(props => {

    const {
        img,
        i,
        calcColsNum,
        loading,
        setClickCountHandler,
        clickCountHandler,
        setFlippedBackCards,
        setMatchedCards,
        setBulkDoneFlippedBack,
    } = props;

    const restart = useSelector(useMemo(selectRestartValue, []));
    const sizeValue = useSelector(useMemo(selectSizeValue, []));

    const [imgSrc] = useState(img.download_url || img.url || img.src);
    const [flip, setFlip] = useState(true);
    const [hide, setHide] = useState(false);
    const [fallBack, setFallBack] = useState(false);
    const [shake, setShake] = useState(false);
    const [itemDimentions, setItemDimentions] = useState((((24 / (sizeValue / 2)) * 100) / calcColsNum));

    const isMounted = useIsMounted();

    /**
     * watch restart flag & loading & sizeValue
     * if restart = true & loading = false [no loading/finished loading]
     * - unhide
     * - flip [show]
     * - wait & flipBack after time
     * - cache in temp bulk after all have finished flippingBack
    */
    useEffect(() => {
        if (restart && !loading) {
            let cacheInBulkFlipOrNot = setBulkDoneFlippedBack.bind(null, imgs => [...imgs, img]);
            setHide(false);
            setFlip(true);
            execAfterTime(
                async () => await execAfterTime(setFlip.bind(null, false), i * 100, cacheInBulkFlipOrNot, isMounted),
                5000,
                undefined,
                isMounted
            );
        }
    }, [restart, sizeValue, loading]);

    // watch for calcColsNum | size change
    useEffect(() => {
        if (isMounted()) setItemDimentions((((24 / (sizeValue / 2)) * 100) / calcColsNum));
    }, [calcColsNum, sizeValue]);

    // watch click counter
    useEffect(() => {
        // if there are items in click counter, start checking
        if (clickCountHandler.length && isMounted()) clickCounterWatcher();
    }, [clickCountHandler]);

    const clickCounterWatcher = useCallback(async () => {

        // if caches length = 2 & is flipped & caches includes this card => proceed
        if (clickCountHandler.length === 2 && flip && clickCountHandler.includes(img.id)) {

            /** if matched, great! 
            * - hide'm
            * - cache'm as matched
            * - update score [out of here]
            */
            if (clickCountHandler[0] === clickCountHandler[1]) {
                // hide
                await execAfterTime(setHide.bind(null, true), undefined, undefined, isMounted);
                // cache it in matched
                setMatchedCards(imgs => [...imgs, img]);
                // cache in temp flipped
                setFlippedBackCards(imgs => [...imgs, img]);
            }
            else {
                let cacheInBulkFlip = () => setFlippedBackCards(imgs => [...imgs, img]);
                // flip-back after 1sec
                setShake(true);
                await execAfterTime(
                    async () => await execAfterTime(()=> setShake(false), i * 10, cacheInBulkFlip, isMounted),
                    undefined,
                    () => setFlip(false),
                    isMounted
                );
                // setFlip(false);
            }

        }
    }, [clickCountHandler]);

    // handle card click
    /** if still loading || 
    * flipped cards >= 2 || 
    * got Matched [hidden] || 
    * already flipped [showen] => 
    * return;
    */
    const handleClick = e => {
        e.preventDefault();
        if (loading || clickCountHandler.length >= 2 || hide || flip) return;

        // update count cache
        setClickCountHandler(ids => [...ids, img.id]);
        // flip
        setFlip(true);
    };

    // fallback for img load err
    const handleImgErr = () => {
        setFallBack(true);
    };

    return (
        <StyledAvatar
            itemdimentions={itemDimentions}
            calccolsnum={calcColsNum}
            className={`${hide ? 'scaleDown' : shake ? 'shake' : ''}`}
        >
            <div className={`card ${flip ? 'flip' : ''}`} onClick={(e) => handleClick(e)}>
                {
                    !fallBack &&
                    <Image
                        src={imgSrc}
                        className={`avatar front`}
                        alt={img.site || `image`}
                        placeholder={
                            <Skeleton
                                title={false}
                                paragraph={false}
                                avatar={{ shape: 'square', size: 'large' }}
                                active
                            />
                        }
                        // fallback={`${<Skeleton.Image/>}`}
                        onError={handleImgErr}
                        preview={false}
                    />
                    ||
                    <Skeleton.Image className={`avatar front fall-back`} />
                }

                <Avatar
                    size="large"
                    src={null}
                    icon={<QuestionOutlined />}
                    shape="square"
                    className={`avatar back`}
                />
            </div>
        </StyledAvatar>
    )
});

export default CardItem;
