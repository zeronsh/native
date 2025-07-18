import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DatabaseProvider } from '$zero/context';
import { Drawer as ExpoDrawer } from 'expo-router/drawer';
import { withUnistyles } from 'react-native-unistyles';
import { FontAwesome } from '$components/icon';
import { Button } from '$components/button';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const Drawer = withUnistyles(ExpoDrawer);

function DrawerToggleButton({ theme }: { theme: any }) {
    const navigation = useNavigation();

    return (
        <Button
            variant="ghost"
            size="icon"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            icon={
                <FontAwesome
                    name="bars-staggered"
                    color={theme.colors.foreground}
                    size={theme.typography.size(1)}
                />
            }
        />
    );
}

export default function RootLayout() {
    return (
        <DatabaseProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer
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
                            headerLeft: () => <DrawerToggleButton theme={theme} />,
                        },
                    })}
                >
                    <ExpoDrawer.Screen
                        name="index"
                        options={{
                            title: 'Chat',
                            drawerLabel: 'Chat',
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </DatabaseProvider>
    );
}
