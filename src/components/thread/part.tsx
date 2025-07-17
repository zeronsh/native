import { match } from 'ts-pattern';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { MessagePart } from '$ai/types';

export function Part({ part }: { part: MessagePart }) {
    return match(part)
        .with({ type: 'text' }, ({ text }) => <Text style={styles.text}>{text}</Text>)
        .otherwise(() => null);
}

const styles = StyleSheet.create(theme => ({
    text: {
        color: theme.colors.foreground,
        fontSize: theme.typography.size(1),
    },
}));
