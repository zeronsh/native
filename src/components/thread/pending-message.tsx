import { BaseMessageProps } from '$ai/types';
import { View } from '$components/app';
import { BallPulseLoader } from '$components/loaders/ball-pulse';
import { StyleSheet } from 'react-native-unistyles';

export function PendingMessage(props: BaseMessageProps) {
    const { hasNextMessage, hasPreviousMessage } = props;

    styles.useVariants({
        hasNextMessage,
        hasPreviousMessage,
    });

    return (
        <View style={styles.container}>
            <BallPulseLoader />
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        paddingVertical: theme.utils.spacing(3),
        variants: {
            hasNextMessage: {
                false: {
                    paddingBottom: theme.utils.spacing(6),
                },
            },
            hasPreviousMessage: {
                false: {
                    paddingTop: theme.utils.spacing(6),
                },
            },
        },
    },
}));
