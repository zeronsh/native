import { customAlphabet } from 'nanoid';
import throttleFunction from 'throttleit';

export const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    21
);

export function throttle<T extends (...args: any[]) => any>(fn: T, waitMs: number | undefined): T {
    return waitMs != null ? throttleFunction(fn, waitMs) : fn;
}
