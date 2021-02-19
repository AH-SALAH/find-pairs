import { Layout } from 'antd';
import { StyledFooter } from "./StyledFooter";
const { Footer } = Layout;

const AppFooter = () => {
    return (
        <StyledFooter>
            <Footer className={'footer'} >
                Find The Pairs ©{new Date().getFullYear()} {' '}
                <a href="https://github.com/AH-SALAH" target="_blank"> AH.SALAH </a>
                によって開発された。
            </Footer>
        </StyledFooter>
    )
};

export default AppFooter;