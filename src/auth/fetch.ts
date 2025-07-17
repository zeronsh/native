import { authClient } from '$auth/client';
import { fetch as expoFetch } from 'expo/fetch';

export const fetch = ((url: string, options: RequestInit) => {
    const cookies = authClient.getCookie();
    const { body, signal, ...restOptions } = options;
    return expoFetch(url, {
        ...restOptions,
        ...(body !== null && { body }),
        ...(signal !== null && { signal }),
        headers: {
            ...options.headers,
            Cookie: cookies,
        },
    });
}) as unknown as typeof globalThis.fetch;
