import { View } from '$components/app';
import { StyleSheet } from 'react-native-unistyles';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function BallPulseLoader() {
    const dot1 = useRef(new Animated.Value(0.3)).current;
    const dot2 = useRef(new Animated.Value(0.3)).current;
    const dot3 = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const createPulseAnimation = (animatedValue: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0.3,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        const animation1 = createPulseAnimation(dot1, 0);
        const animation2 = createPulseAnimation(dot2, 150);
        const animation3 = createPulseAnimation(dot3, 300);

        animation1.start();
        animation2.start();
        animation3.start();

        return () => {
            animation1.stop();
            animation2.stop();
            animation3.stop();
        };
    }, [dot1, dot2, dot3]);

    return (
        <View style={styles.loaderContainer}>
            <Animated.View style={[styles.dot, { opacity: dot1 }]} />
            <Animated.View style={[styles.dot, { opacity: dot2 }]} />
            <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    loaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.utils.spacing(1),
        paddingHorizontal: theme.utils.spacing(4),
        paddingVertical: theme.utils.spacing(2),
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.foregroundSecondary,
    },
}));
