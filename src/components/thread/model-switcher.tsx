import { View, Text } from '$components/app';
import { Button } from '$components/button';
import { Fragment, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FontAwesome } from '$components/icon';
import { useSettings } from '$hooks/use-settings';

export function ModelSwitcher() {
    const settings = useSettings();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <Fragment>
            <Button
                variant="ghost"
                onPress={handlePresentModalPress}
                title={settings?.model?.name}
                rightIcon={
                    <FontAwesome
                        name="caret-down"
                        // @ts-expect-error
                        uniProps={theme => ({
                            color: theme.colors.foreground,
                            size: theme.typography.size(1),
                        })}
                    />
                }
            />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                backgroundStyle={styles.backgroundStyle}
                handleIndicatorStyle={styles.handleIndicatorStyle}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheetModal>
        </Fragment>
    );
}

const styles = StyleSheet.create(theme => ({
    contentContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.utils.spacing(4),
    },
    handleIndicatorStyle: {
        backgroundColor: theme.colors.border,
    },
    backgroundStyle: {
        backgroundColor: theme.colors.background,
    },
}));
