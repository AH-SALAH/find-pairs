import styled from 'styled-components';

export const StyledAvatar = styled.div`

    width: 100%;
    height: ${(props) => props.itemdimentions + 100 / (props.calccolsnum >= 6 ? 2 : 7)}px;
    cursor: pointer;
    perspective: 600px;
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.50, 1);

    &.scaleDown{
        animation: hue 0.5s cubic-bezier(0.19, -1, 0.50, 1) forwards;

        @keyframes hue{
            0%{
                filter: hue-rotate(0) contrast(100%);
                transform: rotateY(0deg) scale(1);
            }
            20%{
                filter: hue-rotate(360deg) contrast(200%);
                transform: rotateY(10deg) scale(1.02);
            }
            60%{
                filter: hue-rotate(45deg) contrast(300%);
                transform: rotateY(-20deg) scale(1.05);
            }
            80%{
                filter: hue-rotate(0) contrast(100%);
                transform: rotateY(10deg) scale(1.1);
            }
            100%{
                filter: hue-rotate(0) contrast(100%);
                transform: rotateY(0deg) scale(0);
            }
        }
    }

    &.shake{
        animation: shake 0.3s ease forwards;

        @keyframes shake{
            0%{transform: translateX(-10px) scaleX(1.05);}
            20%{transform: translateX(10px) scaleY(1.05);}
            60%{transform: translateX(-10px) scaleY(1.1);}
            80%{transform: translateX(10px) scaleY(1.05);}
            100%{transform: translateX(0px) scale(1,1);}
        }
    }

    .card{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin: 0 10px 0px; */
        width: 100%;
        /* height: 100%; */
        height: ${(props) => props.itemdimentions + 100 / (props.calccolsnum >= 6 ? 2 : 7)}px;
        /* minHeight: itemDimentions + 100 / (7); */
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.50, 1);
        transform-origin: 50% 50%;
        transform-style: preserve-3d;

        &:hover{
            transform: rotateY(20deg);
            /* width: calc(100% - 3px); */

            & .avatar{
                font-size: 2.5em!important;

                & span.anticon{
                    transform: rotateY(20deg);
                }
            }
        }

        &.flip{
            transform: rotateY(180deg);
            /* width: inherit; */

            &:hover{
                transform: rotateY(185deg);
                
                & .avatar{
                    font-size: inherit;
                }
            }
        }


        .avatar{
            border-radius: 6px;
            box-shadow: 0 2px 14px rgba(0,0,0,0.3);
            background-color: ${({ theme }) => theme.colors.cardBg};
            backface-visibility: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            font-size: ${(props) => props.itemdimentions / 2}px!important;
            display: flex;
            justify-content: center;
            align-items: center;
            left:0;
            right:0;
            transition: all 0.3s cubic-bezier(0.19, 1, 0.50, 1);
            overflow: hidden;

            &.front{
                transform: rotateY(180deg);

                &.fall-back{
                    backface-visibility: visible;
                    background-color: transparent;
                }
            }

            &.back{
                transform: rotateY(0deg);
            }

            &:hover{
                box-shadow: 0 6px 14px rgba(0,0,0,0.5);
            }

            & img{
                width:100%;
                height:100%;
            }
            
            & .ant-skeleton-image, .ant-skeleton-avatar{
                width:100%;
                height:100%;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
            }

        }
    }
`;