import { Text } from '$components/app';
import { Button } from '$components/button';
import { FontAwesome } from '$components/icon';
import { BottomSheet } from '$components/bottom-sheet';
import { StyleSheet } from 'react-native-unistyles';
import { useSettings } from '$hooks/use-settings';

export function ModelSwitcher() {
    const settings = useSettings();
    return (
        <BottomSheet
            TriggerComponent={props => (
                <Button
                    {...props}
                    variant="secondary"
                    title={settings?.model?.name}
                    style={styles.button}
                    rightIcon={
                        <FontAwesome
                            name="angle-down"
                            // @ts-expect-error
                            uniProps={theme => ({
                                color: theme.colors.foreground,
                                size: theme.typography.size(0.75),
                            })}
                        />
                    }
                />
            )}
        >
            <Text>Awesome 🎉</Text>
        </BottomSheet>
    );
}

const styles = StyleSheet.create(theme => ({
    button: {
        flex: 1,
        minWidth: 180,
        maxWidth: 180,
        justifyContent: 'space-between',
        borderRadius: theme.utils.radius(3),
    },
}));
