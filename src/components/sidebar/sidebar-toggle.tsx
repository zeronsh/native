import { View } from '$components/app';
import { Button } from '$components/button';
import { FontAwesome } from '$components/icon';
import { ModelSwitcher } from '$components/thread/model-switcher';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

export function SidebarToggle() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Button
                size="icon"
                variant="ghost"
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                icon={
                    <FontAwesome
                        name="bars-staggered"
                        // @ts-expect-error
                        uniProps={theme => ({
                            color: theme.colors.foreground,
                            size: theme.typography.size(1),
                        })}
                    />
                }
            />
            <ModelSwitcher />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        alignItems: 'center',
        gap: theme.utils.spacing(2),
    },
}));
