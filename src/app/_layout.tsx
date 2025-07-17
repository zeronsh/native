import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { IBMPlexSans_400Regular } from '@expo-google-fonts/ibm-plex-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        IBMPlexSans_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded || error) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
        </GestureHandlerRootView>
    );
}
