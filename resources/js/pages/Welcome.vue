
<template>
    <div class="welcome">
        <Head title="Welcome" />
        <TheHeader />
        <main class="welcome__main page page--wide">
            <TournamentsList />
        </main>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import TournamentsList from '../components/tournaments/TournamentsList.vue';
import { useTournamentStore } from '../features/tournaments/tournamentStore';
import TheHeader from '@/components/layout/TheHeader.vue';


const tournamentStore = useTournamentStore();

onMounted(() => {
    tournamentStore.loadHomepageTournaments();
})

</script>

<style scoped>
.welcome__main {
    width: 100%;
    padding-top: 1rem;
}
</style>