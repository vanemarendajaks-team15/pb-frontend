import { defineStore } from "pinia";
import { fetchHomepageTournaments } from "./service";


export const useTournamentStore = defineStore('tournament', {
    state: () => ({
        ended: [],
        live: [],        
        future: [],
        loading: false,
        error: null,
        lastFetched: null
    }),
    actions: {
        async loadHomepageTournaments() {
            this.loading = true;
            this.error = null;

            const cacheDuration = 1000 * 60 * 60;
            const now = Date.now();
            
            if (this.lastFeched && (now - this.lastFetched < cacheDuration)) {
                return;
            }

            try {
                const { live, ended } = await fetchHomepageTournaments();
                this.live = live;
                this.ended = ended;
                this.lastFeched = now;
            } catch (error) {
                this.error = "Failed to load tournaments";
                console.log(error);
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        hasLiveTournaments: (state) => state.live.length > 0,
        hasEnded: (state) => state.ended.length > 0,
        hasFuture: (state) => state.future.length > 0
    }
});