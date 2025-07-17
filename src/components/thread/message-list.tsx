import { ThreadMessage } from '$ai/types';
import { AssistantMessage } from '$components/thread/assistant-message';
import { PendingMessage } from '$components/thread/pending-message';
import { UserMessage } from '$components/thread/user-message';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { Fragment, useCallback } from 'react';

export function MessageList(props: { messages: ThreadMessage[] }) {
    const { messages } = props;

    const renderItem = useCallback(
        ({ item, index }: LegendListRenderItemProps<ThreadMessage>) => {
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
        <LegendList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            maintainVisibleContentPosition
            recycleItems
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
