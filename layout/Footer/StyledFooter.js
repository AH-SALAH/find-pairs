import styled from 'styled-components';

export const StyledFooter = styled.div`
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.footerBg}
}

.footer img {
  margin-left: 0.5rem;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  margin: 0 5px;
}
`;