import { View } from '$components/app';
import { MessageList } from '$components/thread/message-list';
import { PromptInput } from '$components/thread/prompt-input';
import { StyleSheet } from 'react-native-unistyles';
import { useChat, Chat } from '@ai-sdk/react';
import { useRef } from 'react';
import { ThreadMessage } from '$ai/types';
import { DefaultChatTransport } from 'ai';
import { useDatabase } from '$zero/context';
import { useSettings } from '$user/use-settings';
import { ThreadProvider } from '$components/thread/context';

export default function Thread() {
    const db = useDatabase();

    useSettings();

    const thread = useRef(
        new Chat<ThreadMessage>({
            transport: new DefaultChatTransport({
                api: '/api/thread',
                credentials: 'include',
                prepareSendMessagesRequest: async ({ id, messages }) => {
                    const settings = db.query.setting
                        .where('userId', '=', db.userID)
                        .one()
                        .materialize();
                    return {
                        body: {
                            id,
                            message: messages.at(-1),
                            modelId: settings.data?.modelId,
                        },
                    };
                },
            }),
        })
    );

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

const styles = StyleSheet.create((_, rt) => ({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: rt.insets.top,
    },
}));
