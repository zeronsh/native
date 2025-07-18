import React, { Fragment, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native-unistyles';

type BottomSheetTriggerProps = {
    onPress: () => void;
};

type BottomSheetProps = {
    children: React.ReactNode;
    ref?: React.RefObject<BottomSheetModal | null>;
    containerStyle?: StyleProp<ViewStyle>;
    handleIndicatorStyle?: StyleProp<ViewStyle>;
    backgroundStyle?: StyleProp<ViewStyle>;
    TriggerComponent: (props: BottomSheetTriggerProps) => React.ReactNode;
    snapPoints?: string[];
};

export function BottomSheet(props: BottomSheetProps) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => props.snapPoints || [], [props.snapPoints]);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    useImperativeHandle(props.ref, () => bottomSheetModalRef.current!);

    return (
        <Fragment>
            <props.TriggerComponent onPress={handlePresentModalPress} />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                animateOnMount={true}
                backgroundStyle={[styles.backgroundStyle, props.backgroundStyle]}
                handleIndicatorStyle={[styles.handleIndicatorStyle, props.handleIndicatorStyle]}
                backdropComponent={props => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.8}
                        onPress={() => {
                            bottomSheetModalRef.current?.dismiss();
                        }}
                    >
                        <BlurView intensity={50} style={{ flex: 1 }} />
                    </BottomSheetBackdrop>
                )}
            >
                <BottomSheetView style={[styles.contentContainer, props.containerStyle]}>
                    {props.children}
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
    button: {
        flex: 1,
        maxWidth: 200,
        justifyContent: 'space-between',
    },
}));
