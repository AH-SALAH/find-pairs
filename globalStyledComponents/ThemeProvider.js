/**
 * in case we need some global values
 * to be passed to styled-components
 * or access from any normal component
 */

import { ThemeProvider } from 'styled-components';

export const theme = {
    colors: {
        primary: 'royalblue',
        footerBg: 'lightsteelblue',
        headerBg: '#fff',
        cardBg: 'cornflowerblue'
    },
};

const SCThemeProvider = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default SCThemeProvider;