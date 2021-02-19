import { Layout, Typography } from 'antd';
import { StyledHeader } from './StyledHeader';

const { Header } = Layout;

const AppHeader = ({ title = 'Find The Pairs' }) => {
    return (
        <StyledHeader>
            <Header className={'header-container'}>
                <Typography.Title level={2} className={'header-title'}>{title}</Typography.Title>
            </Header>
        </StyledHeader>
    )
};

export default AppHeader;