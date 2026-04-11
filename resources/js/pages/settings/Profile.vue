<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';

import SettingsNav from '@/components/SettingsNav.vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: null,
    },
});

const page = usePage();

const initialUser = page.props.auth?.user;

const profileForm = useForm({
    name: initialUser?.name ?? '',
    email: initialUser?.email ?? '',
});

const deleteForm = useForm({
    password: '',
});

function updateProfile() {
    profileForm.patch('/settings/profile');
}

function destroyAccount() {
    deleteForm.delete('/settings/profile');
}
</script>

<template>
    <Head title="Profile" />

    <div class="page page--wide">
        <SettingsNav />

        <div class="stack stack--lg">
            <h1>Profile</h1>

            <div v-if="status" class="status" role="status">
                {{ status }}
            </div>

            <div v-if="mustVerifyEmail" class="status" role="status">
                Your email address is unverified.
                <Link href="/email/verify">Resend verification</Link>
            </div>

            <section class="card stack">
                <h2>Profile information</h2>
                <form class="stack" @submit.prevent="updateProfile">
                    <div class="field">
                        <label for="name">Name</label>
                        <input
                            id="name"
                            v-model="profileForm.name"
                            type="text"
                            name="name"
                            required
                            autocomplete="name"
                        />
                        <span v-if="profileForm.errors.name" class="error">{{
                            profileForm.errors.name
                        }}</span>
                    </div>

                    <div class="field">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            v-model="profileForm.email"
                            type="email"
                            name="email"
                            required
                            autocomplete="email"
                        />
                        <span v-if="profileForm.errors.email" class="error">{{
                            profileForm.errors.email
                        }}</span>
                    </div>

                    <button
                        class="btn btn--primary"
                        type="submit"
                        :disabled="profileForm.processing"
                    >
                        Save
                    </button>
                </form>
            </section>

            <section class="card stack">
                <h2>Delete account</h2>
                <p class="muted">
                    Once deleted, all data will be removed. This cannot be
                    undone.
                </p>
                <form class="stack" @submit.prevent="destroyAccount">
                    <div class="field">
                        <label for="delete_password">Password</label>
                        <input
                            id="delete_password"
                            v-model="deleteForm.password"
                            type="password"
                            name="password"
                            required
                            autocomplete="current-password"
                        />
                        <span v-if="deleteForm.errors.password" class="error">{{
                            deleteForm.errors.password
                        }}</span>
                    </div>
                    <button
                        class="btn btn--danger"
                        type="submit"
                        :disabled="deleteForm.processing"
                    >
                        Delete account
                    </button>
                </form>
            </section>
        </div>
    </div>
</template>
