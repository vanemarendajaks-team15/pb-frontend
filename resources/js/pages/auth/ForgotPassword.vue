<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    status: {
        type: String,
        default: null,
    },
});

const form = useForm({
    email: '',
});

function submit() {
    form.post('/forgot-password');
}
</script>

<template>
    <Head title="Forgot password" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Forgot password</h1>
            <p class="muted">
                Enter your email address and we will send a reset link.
            </p>

            <div v-if="status" class="status" role="status">
                {{ status }}
            </div>

            <form class="stack" @submit.prevent="submit">
                <div class="field">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        name="email"
                        required
                        autocomplete="username"
                    />
                    <span v-if="form.errors.email" class="error">{{
                        form.errors.email
                    }}</span>
                </div>

                <button
                    class="btn btn--primary"
                    type="submit"
                    :disabled="form.processing"
                >
                    Email link
                </button>
            </form>

            <div class="row">
                <Link href="/login">Back to login</Link>
            </div>
        </div>
    </div>
</template>
