import { BaseMessageProps } from '$ai/types';
import { Loader, View } from '$components/app';
import { StyleSheet } from 'react-native-unistyles';

export function PendingMessage(props: BaseMessageProps) {
    const { hasNextMessage, hasPreviousMessage } = props;

    styles.useVariants({
        hasNextMessage,
        hasPreviousMessage,
    });

    return (
        <View style={styles.container}>
            <Loader
                name="BallPulse"
                style={{ width: 32, height: 32 }}
                uniProps={theme => ({
                    color: theme.colors.foregroundSecondary,
                })}
            />
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
