import { useDatabase } from '$zero/context';
import { useQuery } from '@rocicorp/zero/react';

export function useThreads() {
    const db = useDatabase();
    const [threads] = useQuery(
        db.query.thread.where('userId', '=', db.userID).orderBy('updatedAt', 'desc')
    );

    return threads;
}
