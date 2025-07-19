import { createContext, useContext } from 'react';
import { Thread } from '$thread';
import { ThreadMessage } from '$ai/types';

const ThreadContext = createContext<Thread<ThreadMessage> | null>(null);

export function ThreadProvider({
    children,
    thread,
}: {
    children: React.ReactNode;
    thread: Thread<ThreadMessage>;
}) {
    return <ThreadContext.Provider value={thread}>{children}</ThreadContext.Provider>;
}

export function useThreadContext() {
    const thread = useContext(ThreadContext);
    if (!thread) {
        throw new Error('useThreadContext must be used within a ThreadProvider');
    }
    return thread;
}

export function useChatId() {
    return useThreadContext().store(state => state.id);
}

export function useMessageIds() {
    return useThreadContext().store(state => state.messageIds);
}

export function useMessageById(id: string) {
    return useThreadContext().store(state => state.messageMap[id]);
}

export function useChatStatus() {
    return useThreadContext().store(state => state.status);
}

export function useChatError() {
    return useThreadContext().store(state => state.error);
}
