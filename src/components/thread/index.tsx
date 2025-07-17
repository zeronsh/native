import { View } from '$components/app';
import { MessageList } from '$components/thread/message-list';
import { PromptInput } from '$components/thread/prompt-input';
import { StyleSheet } from 'react-native-unistyles';
import { useChat, Chat } from '@ai-sdk/react';
import { createContext, useContext, useRef } from 'react';
import { ThreadMessage } from '$ai/types';

export default function Thread() {
    const thread = useRef(new Chat<ThreadMessage>({}));
    const { messages } = useChat({
        chat: thread.current,
    });

    return (
        <ThreadProvider thread={thread.current}>
            <View style={styles.container}>
                <MessageList messages={messages} />
                <PromptInput />
            </View>
        </ThreadProvider>
    );
}

const ThreadContext = createContext<Chat<ThreadMessage> | null>(null);

function ThreadProvider({
    children,
    thread,
}: {
    children: React.ReactNode;
    thread: Chat<ThreadMessage>;
}) {
    return <ThreadContext.Provider value={thread}>{children}</ThreadContext.Provider>;
}

export function useThread() {
    const thread = useContext(ThreadContext);
    if (!thread) {
        throw new Error('Thread not found');
    }
    return thread;
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
