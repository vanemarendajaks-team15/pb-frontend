<script setup>
import { Head, useForm } from '@inertiajs/vue3';

import SettingsNav from '@/components/SettingsNav.vue';

defineProps({
    canManageTwoFactor: {
        type: Boolean,
        default: false,
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    requiresConfirmation: {
        type: Boolean,
        default: false,
    },
});

const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

function updatePassword() {
    passwordForm.put('/settings/password', {
        preserveScroll: true,
        onSuccess: () => {
            passwordForm.reset(
                'current_password',
                'password',
                'password_confirmation',
            );
        },
    });
}
</script>

<template>
    <Head title="Security" />

    <div class="page page--wide">
        <SettingsNav />

        <div class="stack stack--lg">
            <h1>Security</h1>

            <p v-if="requiresConfirmation" class="muted">
                Some actions may require you to confirm your password first.
            </p>

            <section class="card stack">
                <h2>Update password</h2>
                <form class="stack" @submit.prevent="updatePassword">
                    <div class="field">
                        <label for="current_password">Current password</label>
                        <input
                            id="current_password"
                            v-model="passwordForm.current_password"
                            type="password"
                            name="current_password"
                            required
                            autocomplete="current-password"
                        />
                        <span
                            v-if="passwordForm.errors.current_password"
                            class="error"
                            >{{ passwordForm.errors.current_password }}</span
                        >
                    </div>

                    <div class="field">
                        <label for="password">New password</label>
                        <input
                            id="password"
                            v-model="passwordForm.password"
                            type="password"
                            name="password"
                            required
                            autocomplete="new-password"
                        />
                        <span
                            v-if="passwordForm.errors.password"
                            class="error"
                            >{{ passwordForm.errors.password }}</span
                        >
                    </div>

                    <div class="field">
                        <label for="password_confirmation"
                            >Confirm new password</label
                        >
                        <input
                            id="password_confirmation"
                            v-model="passwordForm.password_confirmation"
                            type="password"
                            name="password_confirmation"
                            required
                            autocomplete="new-password"
                        />
                    </div>

                    <button
                        class="btn btn--primary"
                        type="submit"
                        :disabled="passwordForm.processing"
                    >
                        Update password
                    </button>
                </form>
            </section>

            <section v-if="canManageTwoFactor" class="card stack">
                <h2>Two-factor authentication</h2>
                <p class="muted">
                    Status:
                    <strong>{{
                        twoFactorEnabled ? 'Enabled' : 'Disabled'
                    }}</strong>
                </p>
                <p class="muted">
                    Use Fortify&rsquo;s two-factor routes (QR code, recovery
                    codes, enable/disable) from the backend or extend this page
                    with forms posting to the <code>two-factor.*</code> routes.
                </p>
            </section>
        </div>
    </div>
</template>
