import { extendTheme } from '@chakra-ui/react';

const themeOverrides = {
    colors: {
        primary: {
            50: '#ffe8f7',
            100: '#f3c1de',
            200: '#e69ac6',
            300: '#da72ae',
            400: '#ce4b97',
            500: '#b4317e',
            600: '#8d2562',
            700: '#661947',
            800: '#3f0c2b',
            900: '#1b0111',
        },
        secondary: {
            50: '#defcfa',
            100: '#beefec',
            200: '#9ae1de',
            300: '#74d4d0',
            400: '#50c8c2',
            500: '#37afa9',
            600: '#278883',
            700: '#17625e',
            800: '#033b39',
            900: '#001616',
        },
    },
    fonts: {
        body: 'Nunito, system-ui, sans-serif',
        heading: 'Poppins, system-ui, sans-serif',
    },
    fontWeights: {
        light: 200,
        normal: 400,
        bold: 700,
        black: 900,
    },
    textStyles: {
        h1: {
            fontSize: ['48px', '72px'],
            fontWeight: 'bold',
            lineHeight: '110%',
            letterSpacing: '-2px',
        },
        h2: {
            fontSize: ['28px', '38px'],
            fontWeight: 'normal',
            lineHeight: '110%',
            letterSpacing: '-1px',
        },
        h3: {
            fontSize: ['20px', '28px'],
            fontWeight: 'normal',
            lineHeight: '110%',
            letterSpacing: '-1px',
        },
        h4: {
            fontSize: ['18px', '24px'],
            fontWeight: 'normal',
            lineHeight: '110%',
            letterSpacing: '-1px',
        },
    },
};

export const theme = extendTheme(themeOverrides);
