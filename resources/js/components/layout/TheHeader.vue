<script setup>
import { Head, Link } from '@inertiajs/vue3';


// vajaks mudimist autentimise osas!

defineProps({
    canRegister: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <header class="app-header" role="banner">
        <div class="row">
            <h1>The Header</h1>
            <div class="buttons">
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
    </header>
</template>

<style scoped>
.app-header {
    background-color: #abf0d1;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
}
.buttons {
    margin-left: auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 0.75rem;
    align-items: right;
}
</style>