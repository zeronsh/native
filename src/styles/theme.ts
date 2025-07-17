import { Platform } from 'react-native';

const typography = {
    size: (value: number) => value * 16,
    fontFamily: Platform.select({
        ios: 'IBMPlexSans-Regular',
        android: 'IBMPlexSans_400Regular',
        web: 'IBMPlexSans_400Regular',
    }),
} as const;

const utils = {
    spacing: (value: number) => value * typography.size(1 / 4),
    radius: (value: number) => value * typography.size(1 / 4),
} as const;

const widths = {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
} as const;

export const lightTheme = {
    utils,
    typography,
    widths,
    colors: {
        background: '#fcfcfc',
        foreground: '#000000',
        card: '#ffffff',
        cardForeground: '#000000',
        popover: '#fcfcfc',
        popoverForeground: '#000000',
        primary: '#000000',
        primaryForeground: '#ffffff',
        secondary: '#ebebeb',
        secondaryForeground: '#000000',
        muted: '#f5f5f5',
        mutedForeground: '#525252',
        accent: '#ebebeb',
        accentForeground: '#000000',
        destructive: '#e54b4f',
        destructiveForeground: '#ffffff',
        border: 'rgba(0, 0, 0, 0.2)',
        input: '#ebebeb',
        ring: '#000000',
        // Legacy colors for backward compatibility
        foregroundSecondary: '#525252',
        backgroundSecondary: '#ebebeb',
    },
} as const;

export const darkTheme = {
    utils,
    typography,
    widths,
    colors: {
        background: '#000000',
        foreground: '#ffffff',
        card: '#090909',
        cardForeground: '#ffffff',
        popover: '#121212',
        popoverForeground: '#ffffff',
        primary: '#ffffff',
        primaryForeground: '#000000',
        secondary: '#222222',
        secondaryForeground: '#ffffff',
        muted: '#1d1d1d',
        mutedForeground: '#a4a4a4',
        accent: '#333333',
        accentForeground: '#ffffff',
        destructive: '#ff5b5b',
        destructiveForeground: '#000000',
        border: 'rgba(255, 255, 255, 0.2)',
        input: '#333333',
        ring: '#a4a4a4',
        // Legacy colors for backward compatibility
        foregroundSecondary: '#a4a4a4',
        backgroundSecondary: '#222222',
    },
} as const;
