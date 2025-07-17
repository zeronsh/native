import { fetch as expoFetch } from 'expo/fetch';

export const fetch = expoFetch as unknown as typeof globalThis.fetch;
