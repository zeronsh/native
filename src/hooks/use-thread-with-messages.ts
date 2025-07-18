import { useDatabase } from '$zero/context';
import { useQuery } from '@rocicorp/zero/react';

export function useThreadWithMessages(threadId: string) {
    const db = useDatabase();
    const [thread] = useQuery(
        db.query.thread
            .where('id', '=', threadId)
            .related('messages', q => q.orderBy('createdAt', 'asc'))
            .one()
    );

    return thread;
}
