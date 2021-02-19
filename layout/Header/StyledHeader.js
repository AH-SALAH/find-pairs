import styled from 'styled-components';

export const StyledHeader = styled.div`
    .header-container{
        padding: 15px;
        background: ${({ theme }) => theme.colors.headerBg};
        text-align: center;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        
        & .header-title{
            margin: 0;
            font-family: 'Henny Penny', cursive;
        }
    }
`;