<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const user = computed(() => page.props.auth?.user);
</script>

<template>
    <Head title="Dashboard" />

    <div class="page page--wide">
        <div class="stack stack--lg">
            <h1>Dashboard</h1>
            <p v-if="user" class="muted">Signed in as {{ user.email }}.</p>
            <div class="row">
                <Link class="btn btn--secondary" href="/settings/profile">
                    Settings
                </Link>
                <Link class="btn btn--secondary" href="/"> Home </Link>
            </div>
        </div>
    </div>
</template>
