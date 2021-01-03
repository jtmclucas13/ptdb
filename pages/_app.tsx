import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'styles/theme';
import '../styles/globals.css';

// Enable API mocking in all environments except production.
// This is recommended for real-world apps.
if (process.env.NODE_ENV !== 'production') {
    require('../mocks');
}

const MyApp: React.FC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;
