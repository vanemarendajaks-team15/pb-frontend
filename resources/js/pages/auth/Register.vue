<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/register', {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
}
</script>

<template>
    <Head title="Register" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Register</h1>

            <form class="stack" @submit.prevent="submit">
                <div class="field">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        name="name"
                        required
                        autocomplete="name"
                    />
                    <span v-if="form.errors.name" class="error">{{
                        form.errors.name
                    }}</span>
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        name="email"
                        required
                        autocomplete="email"
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
                    Register
                </button>
            </form>

            <div class="row">
                <Link href="/login">Already registered?</Link>
            </div>
        </div>
    </div>
</template>
