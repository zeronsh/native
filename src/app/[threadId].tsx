import Thread from '$components/thread';
import { useLocalSearchParams } from 'expo-router';
import { useThreadWithMessages } from '$hooks/use-thread-with-messages';
import { Fragment } from 'react';

export default function Page() {
    const { threadId } = useLocalSearchParams<{ threadId: string }>();
    const thread = useThreadWithMessages(threadId);

    if (!thread) {
        return null;
    }

    return (
        <Fragment>
            <Thread key={thread.id} id={thread.id} messages={thread.messages.map(m => m.message)} />
        </Fragment>
    );
}
