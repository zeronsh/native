import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { StyleSheet, UnistylesVariants } from 'react-native-unistyles';

type SpinningLoaderProps = {
    size?: number;
    strokeWidth?: number;
    color?: string;
} & UnistylesVariants<typeof styles>;

export function SpinningLoader({
    size = 24,
    strokeWidth = 2,
    color,
    variant,
}: SpinningLoaderProps) {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );

        spinAnimation.start();

        return () => {
            spinAnimation.stop();
        };
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    styles.useVariants({ variant });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: strokeWidth,
                        borderColor: color,
                        transform: [{ rotate: spin }],
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        variants: {
            variant: {
                default: {
                    borderLeftColor: theme.colors.primary,
                },
                secondary: {
                    borderLeftColor: theme.colors.foregroundSecondary,
                },
                muted: {
                    borderLeftColor: theme.colors.mutedForeground,
                },
                accent: {
                    borderLeftColor: theme.colors.accent,
                },
            },
        },
    },
}));
