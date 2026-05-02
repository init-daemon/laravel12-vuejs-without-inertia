import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDebounceFn } from '@vueuse/core';
import { DEBOUNCE_TIME } from '@/components/config/app';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function valueUpdater(updaterOrValue, ref) {
    ref.value = typeof updaterOrValue === 'function'
        ? updaterOrValue(ref.value)
        : updaterOrValue
}

export function debouncedFn(callback) {
    return useDebounceFn(callback, DEBOUNCE_TIME);
}