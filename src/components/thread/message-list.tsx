import { ThreadMessage } from '$ai/types';
import { MessageItem } from '$components/thread/message-item';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';

export function MessageList(props: { messages: ThreadMessage[] }) {
    const { messages } = props;

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<ThreadMessage>) => {
            const hasNextMessage = messages[index + 1] !== undefined;
            const hasPreviousMessage = messages[index - 1] !== undefined;

            return (
                <View style={styles.messageStyle}>
                    <MessageItem
                        message={item}
                        hasNextMessage={hasNextMessage}
                        hasPreviousMessage={hasPreviousMessage}
                    />
                </View>
            );
        },
        [messages.length]
    );

    return (
        <View style={styles.list}>
            <FlashList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEventThrottle={16}
                maintainVisibleContentPosition={{
                    autoscrollToBottomThreshold: 0.1,
                    startRenderingFromBottom: true,
                }}
                estimatedItemSize={10000}
            />
        </View>
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    list: {
        width: '100%',
        flex: 1,
    },
    messageStyle: {
        width: '100%',
        maxWidth: theme.widths.md,
        marginHorizontal: 'auto',
        paddingHorizontal: theme.utils.spacing(4),
    },
}));
