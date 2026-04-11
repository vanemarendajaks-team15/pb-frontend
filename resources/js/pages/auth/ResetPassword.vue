<script setup>
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/reset-password', {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
}
</script>

<template>
    <Head title="Reset password" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Reset password</h1>

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

                <div class="field">
                    <label for="password">New password</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        name="password"
                        required
                        autocomplete="new-password"
                    />
                    <span v-if="form.errors.password" class="error">{{
                        form.errors.password
                    }}</span>
                </div>

                <div class="field">
                    <label for="password_confirmation">Confirm password</label>
                    <input
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        type="password"
                        name="password_confirmation"
                        required
                        autocomplete="new-password"
                    />
                </div>

                <button
                    class="btn btn--primary"
                    type="submit"
                    :disabled="form.processing"
                >
                    Reset password
                </button>
            </form>
        </div>
    </div>
</template>
