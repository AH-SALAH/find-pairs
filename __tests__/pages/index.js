
import { render } from "@/__tests__/config/jest/customRender";
import Home from "@/pages";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        query: {},
    })),
}));


describe('test home component', () => {

    it('should render without issue', async () => {
        const { findAllByText } = render(<Home />);
        const ftp = await findAllByText(/find the pairs/i);
        expect(ftp.length).toBeGreaterThanOrEqual(1);
        expect(ftp[0]).toHaveTextContent(/find the pairs/i);
    });

});