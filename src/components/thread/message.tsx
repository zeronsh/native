import { AssistantMessage } from '$components/thread/assistant-message';
import { PendingMessage } from '$components/thread/pending-message';
import { UserMessage } from '$components/thread/user-message';
import { Fragment } from 'react';
import { useMessageById } from '$thread/context';

export function Message(props: {
    id: string;
    hasNextMessage: boolean;
    hasPreviousMessage: boolean;
}) {
    const { id, hasNextMessage, hasPreviousMessage } = props;

    const message = useMessageById(id);

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
