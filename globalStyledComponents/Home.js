import styled from 'styled-components';

export const StyledHome = styled.div`
.container {
  /* min-height: 100vh; */
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .main {
        padding: 5rem 0;
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
}

`