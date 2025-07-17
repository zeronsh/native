import { StyleSheet } from 'react-native-unistyles';

import { breakpoints } from '$styles/breakpoints';
import { lightTheme, darkTheme } from '$styles/theme';

type AppBreakpoints = typeof breakpoints;

type AppThemes = {
    light: typeof lightTheme;
    dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
    export interface UnistylesBreakpoints extends AppBreakpoints {}
    export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
    breakpoints,
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
    settings: {
        adaptiveThemes: true,
    },
});
