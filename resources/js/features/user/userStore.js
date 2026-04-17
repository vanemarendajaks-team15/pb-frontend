import { defineStore } from 'pinia';
import User from './user.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: User | null
    }),
    actions: {
        setUser(data) {
            this.user = new User(data);
        },
        clearUser() {
            this.user = null
        }
    }
});