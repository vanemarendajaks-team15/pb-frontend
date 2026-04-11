import { defineStore } from 'pinia';

/**
 * Application-wide client state (Pinia). Add modules here as the app grows.
 */
export const useAppStore = defineStore('app', {
    state: () => ({
        /** Example: UI flags that are not server-driven */
    }),
});
