<script setup>
import { Link, router } from '@inertiajs/vue3';

function logout() {
    router.post('/logout');
}
</script>

<template>
    <nav class="nav" aria-label="Settings">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/settings/profile">Profile</Link>
        <Link href="/settings/security">Security</Link>
        <Link href="/settings/appearance">Appearance</Link>
        <span class="nav-spacer" />
        <button type="button" class="btn btn--secondary" @click="logout">
            Log out
        </button>
    </nav>
</template>
