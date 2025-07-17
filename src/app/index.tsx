import { View } from '$components/app';
import { MessageList } from '$components/thread/message-list';
import { PromptInput } from '$components/thread/prompt-input';
import { StyleSheet } from 'react-native-unistyles';

export default function App() {
    return (
        <View style={styles.container}>
            <MessageList messages={[]} />
            <PromptInput />
        </View>
    );
}

const styles = StyleSheet.create((_, rt) => ({
    container: {
        flex: 1,
        gap: 16,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: rt.insets.top,
    },
}));
