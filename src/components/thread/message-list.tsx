import { ThreadMessage } from '$ai/types';
import { AssistantMessage } from '$components/thread/assistant-message';
import { PendingMessage } from '$components/thread/pending-message';
import { UserMessage } from '$components/thread/user-message';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function MessageList(props: { messages: ThreadMessage[] }) {
    const { messages } = props;
    const flatListRef = useRef<FlatList>(null);
    const isNearBottom = useRef(true);
    const scrollToBottomTimeout = useRef<NodeJS.Timeout | null>(null);

    const lastMessage = messages[messages.length - 1];
    const lastMessageContent =
        lastMessage?.parts
            .filter(part => part.type === 'text')
            .map(part => part.text)
            .join('') || '';

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
        isNearBottom.current = distanceFromBottom < 100;
        if (!isNearBottom.current && scrollToBottomTimeout.current) {
            clearTimeout(scrollToBottomTimeout.current);
            scrollToBottomTimeout.current = null;
        }
    }, []);

    useEffect(() => {
        if (isNearBottom.current && !scrollToBottomTimeout.current) {
            scrollToBottomTimeout.current = setTimeout(() => {
                flatListRef.current?.scrollToEnd();
                scrollToBottomTimeout.current = null;
            }, 50);
        }
    }, [lastMessageContent]);

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<ThreadMessage>) => {
            const hasNextMessage = messages[index + 1] !== undefined;
            const hasPreviousMessage = messages[index - 1] !== undefined;

            return (
                <MessageItem
                    message={item}
                    hasNextMessage={hasNextMessage}
                    hasPreviousMessage={hasPreviousMessage}
                />
            );
        },
        [messages.length]
    );

    return (
        <FlatList
            ref={flatListRef}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
        />
    );
}

function MessageItem(props: {
    message: ThreadMessage;
    hasNextMessage: boolean;
    hasPreviousMessage: boolean;
}) {
    const { message, hasNextMessage, hasPreviousMessage } = props;

    if (message.role === 'assistant' && message.parts.length > 0) {
        return (
            <AssistantMessage
                message={message}
                hasNextMessage={hasNextMessage}
                hasPreviousMessage={hasPreviousMessage}
            />
        );
    }

    if (message.role === 'assistant' && message.parts.length === 0) {
        return (
            <PendingMessage
                hasNextMessage={hasNextMessage}
                hasPreviousMessage={hasPreviousMessage}
            />
        );
    }

    if (message.role === 'user' && !props.hasNextMessage) {
        return (
            <Fragment>
                <UserMessage
                    message={message}
                    hasPreviousMessage={hasPreviousMessage}
                    hasNextMessage={true}
                />
                <PendingMessage hasNextMessage={hasNextMessage} hasPreviousMessage={true} />
            </Fragment>
        );
    }

    return (
        <UserMessage
            message={message}
            hasPreviousMessage={hasPreviousMessage}
            hasNextMessage={hasNextMessage}
        />
    );
}

const styles = StyleSheet.create((theme, rt) => ({
    list: {
        width: '100%',
    },
    contentContainer: {
        width: '100%',
        maxWidth: theme.widths.md,
        marginHorizontal: 'auto',
        paddingHorizontal: theme.utils.spacing(4),
    },
}));
