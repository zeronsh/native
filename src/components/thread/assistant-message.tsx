import { MessageProps } from '$ai/types';
import { Part } from '$components/thread/part';
import { View } from '$components/app';
import { StyleSheet } from 'react-native-unistyles';

export function AssistantMessage(props: MessageProps) {
    const { message, hasNextMessage, hasPreviousMessage } = props;

    styles.useVariants({
        hasNextMessage,
        hasPreviousMessage,
    });

    return (
        <View style={styles.container}>
            {message.parts.map((part, i) => (
                <Part key={i} part={part} />
            ))}
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
