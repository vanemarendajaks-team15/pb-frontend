<script setup>
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    password: '',
});

function submit() {
    form.post('/user/confirm-password', {
        onFinish: () => {
            form.reset('password');
        },
    });
}
</script>

<template>
    <Head title="Confirm password" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Confirm password</h1>
            <p class="muted">
                This is a secure area. Please confirm your password before
                continuing.
            </p>

            <form class="stack" @submit.prevent="submit">
                <div class="field">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        name="password"
                        required
                        autocomplete="current-password"
                    />
                    <span v-if="form.errors.password" class="error">{{
                        form.errors.password
                    }}</span>
                </div>

                <button
                    class="btn btn--primary"
                    type="submit"
                    :disabled="form.processing"
                >
                    Confirm
                </button>
            </form>
        </div>
    </div>
</template>
