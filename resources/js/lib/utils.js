import { clsx } from 'clsx';

/**
 * Merge class names (clsx). Tailwind-specific merging was removed in favor of plain CSS.
 */
export function cn(...inputs) {
    return clsx(inputs);
}

export function toUrl(href) {
    return typeof href === 'string' ? href : href?.url;
}
