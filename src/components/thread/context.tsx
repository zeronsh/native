import { Chat } from '@ai-sdk/react';
import { createContext, useContext } from 'react';
import { ThreadMessage } from '$ai/types';

const ThreadContext = createContext<Chat<ThreadMessage> | null>(null);

export function ThreadProvider({
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
