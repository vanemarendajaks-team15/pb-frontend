<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    canResetPassword: {
        type: Boolean,
        default: true,
    },
    canRegister: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: null,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

function submit() {
    form.post('/login', {
        onFinish: () => {
            form.reset('password');
        },
    });
}
</script>

<template>
    <Head title="Log in" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Log in</h1>

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

                <div class="field row">
                    <input
                        id="remember"
                        v-model="form.remember"
                        type="checkbox"
                        name="remember"
                    />
                    <label for="remember">Remember me</label>
                </div>

                <button
                    class="btn btn--primary"
                    type="submit"
                    :disabled="form.processing"
                >
                    Log in
                </button>
            </form>

            <div v-if="canResetPassword" class="row">
                <Link href="/forgot-password">Forgot password?</Link>
            </div>

            <div v-if="canRegister" class="row">
                <Link href="/register">Create an account</Link>
            </div>
        </div>
    </div>
</template>
