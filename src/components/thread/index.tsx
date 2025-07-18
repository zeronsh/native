import { View } from '$components/app';
import { MessageList } from '$components/thread/message-list';
import { PromptInput } from '$components/thread/prompt-input';
import { StyleSheet } from 'react-native-unistyles';
import { useChat, Chat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { ThreadMessage } from '$ai/types';
import { DefaultChatTransport } from 'ai';
import { useDatabase } from '$zero/context';
import { useSettings } from '$hooks/use-settings';
import { ThreadProvider } from '$components/thread/context';
import { env } from '$lib/env';
import { fetch } from '$auth/fetch';

export default function Thread({ id, messages }: { id?: string; messages?: ThreadMessage[] }) {
    const db = useDatabase();

    useSettings();

    const thread = useRef(
        new Chat<ThreadMessage>({
            id,
            messages,
            transport: new DefaultChatTransport({
                api: env.EXPO_PUBLIC_API_URL.concat('/api/thread'),
                fetch,
                credentials: 'include',
                prepareSendMessagesRequest: async ({ id, messages }) => {
                    const settings = await db.query.setting
                        .where('userId', '=', db.userID)
                        .one()
                        .run();

                    return {
                        body: {
                            id,
                            message: messages.at(-1),
                            modelId: settings?.modelId,
                        },
                    };
                },
            }),
        })
    );

    const chat = useChat({
        chat: thread.current,
    });

    useEffect(() => {
        if (chat.messages.length === 0 && messages && messages.length > 0) {
            chat.setMessages(messages);
        }
    }, [chat.messages, messages]);

    return (
        <ThreadProvider thread={thread.current}>
            <View style={styles.container}>
                <MessageList messages={chat.messages} />
                <PromptInput />
            </View>
        </ThreadProvider>
    );
}

const styles = StyleSheet.create(_ => ({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));
