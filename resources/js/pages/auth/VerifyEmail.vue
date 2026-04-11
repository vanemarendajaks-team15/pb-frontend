<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';

defineProps({
    status: {
        type: String,
        default: null,
    },
});

const form = useForm({});

function resend() {
    form.post('/email/verification-notification');
}

function logout() {
    router.post('/logout');
}
</script>

<template>
    <Head title="Verify email" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Verify your email</h1>
            <p class="muted">
                Thanks for signing up! Before getting started, please verify
                your email by clicking the link we emailed you. If you did not
                receive the email, we will gladly send another.
            </p>

            <div v-if="status" class="status" role="status">
                {{ status }}
            </div>

            <div class="row">
                <button
                    class="btn btn--primary"
                    type="button"
                    :disabled="form.processing"
                    @click="resend"
                >
                    Resend verification email
                </button>
            </div>

            <div class="row">
                <button
                    class="btn btn--secondary"
                    type="button"
                    @click="logout"
                >
                    Log out
                </button>
                <Link href="/">Home</Link>
            </div>
        </div>
    </div>
</template>
