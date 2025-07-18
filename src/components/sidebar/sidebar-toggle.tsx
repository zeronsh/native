import { Button } from '$components/button';
import { FontAwesome } from '$components/icon';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export function SidebarToggle() {
    const navigation = useNavigation();

    return (
        <Button
            variant="ghost"
            size="icon"
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
    );
}
