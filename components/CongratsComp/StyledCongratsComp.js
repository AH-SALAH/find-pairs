import styled from 'styled-components';

export const StyledCongratsComp = styled.div`
    /* background: url(${(props) => props.bg}) no-repeat no-repeat center center/cover; */

    .bg{
        animation: falling 3s linear infinite;
    }    

    @keyframes falling {
        0%{
            top: -300%;
        }
        20%{
            transform: skewX(5deg);
        }
        40%{
            transform: skewX(10deg);
        }
        60%{
            transform: skewX(5deg);
        }
        80%{
            transform: skewX(0deg) ;
        }
        100%{
            top: 300%;
        }
    }

    .ant-result-extra{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
    }
`;