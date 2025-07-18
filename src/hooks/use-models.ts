import { useDatabase } from '$zero/context';
import { useQuery } from '@rocicorp/zero/react';

export function useModels() {
    const db = useDatabase();
    const [models] = useQuery(db.query.model.orderBy('name', 'asc'));

    return models;
}
