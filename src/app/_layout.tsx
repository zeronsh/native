import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DatabaseProvider } from '$zero/context';
import { Drawer as ExpoDrawer } from 'expo-router/drawer';
import { withUnistyles } from 'react-native-unistyles';
import { SidebarToggle } from '$components/sidebar/sidebar-toggle';
import { SidebarContent } from '$components/sidebar/sidebar-content';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Drawer = withUnistyles(ExpoDrawer);

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
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
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <Drawer
                        drawerContent={SidebarContent}
                        uniProps={theme => ({
                            screenOptions: {
                                drawerStyle: {
                                    backgroundColor: theme.colors.card,
                                },
                                drawerContentStyle: {
                                    backgroundColor: theme.colors.card,
                                },
                                headerStyle: {
                                    backgroundColor: theme.colors.background,
                                },
                                headerTitleStyle: {
                                    color: theme.colors.foreground,
                                    fontSize: theme.typography.size(1),
                                    fontFamily: theme.typography.fontFamily,
                                    fontWeight: '500',
                                },
                                sceneStyle: {
                                    backgroundColor: theme.colors.background,
                                },
                                headerLeft: SidebarToggle,
                                overlayColor: theme.colors.border,
                            },
                        })}
                    >
                        <ExpoDrawer.Screen
                            name="index"
                            options={{
                                title: '',
                                drawerLabel: 'Chat',
                            }}
                        />
                        <ExpoDrawer.Screen
                            name="[threadId]"
                            options={{
                                title: '',
                                drawerLabel: 'Chat',
                            }}
                        />
                    </Drawer>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </DatabaseProvider>
    );
}
