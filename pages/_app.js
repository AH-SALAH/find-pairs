import { wrapper } from '@/redux/store';
import "@/assets/less/antd-custom.less";
import { GlobalStyle } from "@/globalStyledComponents/Global";
import SCThemeProvider from "@/globalStyledComponents/ThemeProvider";

function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <SCThemeProvider>
                <Component {...pageProps} />
            </SCThemeProvider>
        </>
    )
}

export default wrapper.withRedux(App);
