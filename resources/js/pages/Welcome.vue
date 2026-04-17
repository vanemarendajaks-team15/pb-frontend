<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import { useTournamentStore } from '../features/tournaments/tournamentStore';
import TheHeader from '@/components/layout/TheHeader.vue';

const tournamentStore = useTournamentStore();

onMounted(() => {
    tournamentStore.loadHomepageTournaments();
})

defineProps({
    canRegister: {
        type: Boolean,
        default: false,
    },
});



</script>

<template>
    <div>
        <Head title="Welcome" />
        <TheHeader />
        <div class="page">
            <div class="stack stack--lg">
                <h1>Main view</h1>
                <p class="muted">
                    You are ready to build Vue 3 pages with Inertia and Laravel.
                </p>
                <div class="row">
                    <Link class="btn btn--primary" href="/login">Log in</Link>
                    <Link
                        v-if="canRegister"
                        class="btn btn--secondary"
                        href="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
