import '../styles/globals.css';

// Enable API mocking in all environments except production.
// This is recommended for real-world apps.
if (process.env.NODE_ENV !== 'production') {
    require('../mocks');
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
