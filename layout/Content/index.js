import { Layout } from 'antd';
import { StyledContent } from './StyledContent';

const { Content } = Layout;

const AppContent = ({ children }) => {
    return (
        <StyledContent>
            <Content  className={'content-container'}>
                {children}
            </Content>
        </StyledContent>
    )
};

export default AppContent;