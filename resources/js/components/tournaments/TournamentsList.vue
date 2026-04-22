<template>
    <section class="tournaments">
        <div class="tournaments__status">
            <span>SCORES | </span>
        </div>
        <ul class="tournaments__list">
            <Tournament-item v-for="tournament in tournamentStore.live"
            :key="tournament.id"
            :name="tournament.name"
            :location="tournament.location"
            :startDate="tournament.startDate"
            :endDate="tournament.endDate"
            :image="tournament.image"
            :entries="tournament.entries"
            :categories="tournament.categories">
            </Tournament-item>
        </ul>
        <hr class="rounded">
        <ul class="tournaments__list">
            <Tournament-item v-for="tournament in tournamentStore.ended"
            :key="tournament.id"
            :name="tournament.name"
            :location="tournament.location"
            :startDate="tournament.startDate"
            :endDate="tournament.endDate"
            :image="tournament.image"
            :entries="tournament.entries"
            :categories="tournament.categories">
            </Tournament-item>
        </ul>
    </section>
</template>


<script setup>
import { useTournamentStore } from '../../features/tournaments/tournamentStore';
import TournamentItem from './TournamentItem.vue';

const tournamentStore = useTournamentStore();
</script>

<style scoped>
.tournaments {
    width: 100%;
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
}

.tournaments__status {
    width: 100%;
    max-width: 78rem;
    font-weight: 700;
    text-align: left;
    font-size: 1rem;
    padding: 0 0.25rem;
}

.tournaments__list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 78rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.tournaments__list > * {
    width: 100%;
}

hr.rounded {
    border: none;
    height: 3px;
    background-color: #E1E1E1;
    width: 100%;
    max-width: 78rem;
    margin: 1.5rem 0;
    transform: translateX(1.5rem);
}

@media (min-width: 900px) {
    .tournaments {
        align-items: stretch;
        border-left: 2px solid #E1E1E1;
        padding-left: 2rem;
        margin-left: 2rem;
    }
}
</style>
