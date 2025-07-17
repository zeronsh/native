import { Part } from '$components/thread/part';
import { MessageProps } from '$ai/types';
import { StyleSheet } from 'react-native-unistyles';
import { View } from '$components/app';

export function UserMessage(props: MessageProps) {
    const { message, hasNextMessage, hasPreviousMessage } = props;

    styles.useVariants({
        hasNextMessage,
        hasPreviousMessage,
    });

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                {message.parts.map((part, i) => (
                    <Part key={i} part={part} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create(theme => ({
    container: {
        paddingVertical: theme.utils.spacing(3),
        justifyContent: 'flex-end',
        variants: {
            hasNextMessage: {
                false: {
                    paddingBottom: theme.utils.spacing(12),
                },
            },
            hasPreviousMessage: {
                false: {
                    paddingTop: theme.utils.spacing(12),
                },
            },
        },
    },
    message: {
        maxWidth: '70%',
        flexDirection: 'column',
        padding: theme.utils.spacing(5),
        backgroundColor: theme.colors.backgroundSecondary,
        borderTopLeftRadius: theme.utils.spacing(8),
        borderTopRightRadius: theme.utils.spacing(8),
        borderBottomLeftRadius: theme.utils.spacing(8),
        borderBottomRightRadius: theme.utils.spacing(3),
    },
}));
