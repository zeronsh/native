import { View } from '$components/app';
import { MessageList } from '$components/thread/message-list';
import { PromptInput } from '$components/thread/prompt-input';
import { StyleSheet } from 'react-native-unistyles';
import { useMemo, useRef } from 'react';
import { ThreadMessage } from '$ai/types';
import { DefaultChatTransport } from 'ai';
import { useDatabase } from '$zero/context';
import { useSettings } from '$hooks/use-settings';
import { env } from '$lib/env';
import { fetch } from '$auth/fetch';
import { ThreadProvider } from '$thread/context';
import { Thread as ThreadClass } from '$thread';

export default function Thread({ id, messages }: { id?: string; messages?: ThreadMessage[] }) {
    const db = useDatabase();

    useSettings();

    const transport = useMemo(() => {
        return new DefaultChatTransport({
            api: env.EXPO_PUBLIC_API_URL.concat('/api/thread'),
            fetch,
            credentials: 'include',
            prepareSendMessagesRequest: async ({ id, messages }) => {
                const settings = await db.query.setting.where('userId', '=', db.userID).one().run();

                return {
                    body: {
                        id,
                        message: messages.at(-1),
                        modelId: settings?.modelId,
                    },
                };
            },
        });
    }, []);

    const threadRef = useRef(
        new ThreadClass<ThreadMessage>({
            id,
            messages,
            transport,
        })
    );

    // useEffect(() => {
    //     if (thread.messages.length === 0 && messages && messages.length > 0) {
    //         thread.setMessages(messages);
    //     }
    // }, [thread.messages, messages]);

    return (
        <ThreadProvider thread={threadRef.current}>
            <View style={styles.container}>
                <MessageList />
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
