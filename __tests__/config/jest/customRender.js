import { render } from '@testing-library/react';
// to render with theme
import { ThemeProvider } from "styled-components";
import { theme } from "@/globalStyledComponents/ThemeProvider";

const AllTheProviders = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };