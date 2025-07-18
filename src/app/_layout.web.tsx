import { Slot } from 'expo-router';
import { IBMPlexSans_400Regular } from '@expo-google-fonts/ibm-plex-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DatabaseProvider } from '$zero/context';
import { View } from '$components/app';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        IBMPlexSans_400Regular,
        'model-icons': require('../../assets/model-icons.ttf'),
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
        <DatabaseProvider>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Slot />
            </View>
        </DatabaseProvider>
    );
}
