<script setup>
import { Head, router } from '@inertiajs/vue3';

import SettingsNav from '@/components/SettingsNav.vue';

const appearanceValues = ['light', 'dark', 'system'];

function setAppearance(value) {
    const maxAge = 60 * 60 * 24 * 365;

    document.cookie = `appearance=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;

    if (value === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (value === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;

        if (prefersDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    router.reload();
}
</script>

<template>
    <Head title="Appearance" />

    <div class="page page--wide">
        <SettingsNav />

        <div class="stack stack--lg">
            <h1>Appearance</h1>
            <p class="muted">
                Theme preference is stored in the <code>appearance</code> cookie
                (see <code>HandleAppearance</code> middleware).
            </p>

            <div class="card row">
                <button
                    v-for="mode in appearanceValues"
                    :key="mode"
                    type="button"
                    class="btn btn--secondary"
                    @click="setAppearance(mode)"
                >
                    {{ mode }}
                </button>
            </div>
        </div>
    </div>
</template>
