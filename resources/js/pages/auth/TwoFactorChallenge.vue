<script setup>
import { Head, useForm } from '@inertiajs/vue3';

const codeForm = useForm({
    code: '',
});

const recoveryForm = useForm({
    recovery_code: '',
});

function submitCode() {
    codeForm.post('/two-factor-challenge', {
        onFinish: () => {
            codeForm.reset('code');
        },
    });
}

function submitRecovery() {
    recoveryForm.post('/two-factor-challenge', {
        onFinish: () => {
            recoveryForm.reset('recovery_code');
        },
    });
}
</script>

<template>
    <Head title="Two-factor authentication" />

    <div class="page">
        <div class="stack stack--lg">
            <h1>Two-factor authentication</h1>
            <p class="muted">
                Enter the authentication code from your authenticator app, or a
                recovery code.
            </p>

            <form class="stack" @submit.prevent="submitCode">
                <div class="field">
                    <label for="code">Authentication code</label>
                    <input
                        id="code"
                        v-model="codeForm.code"
                        type="text"
                        name="code"
                        inputmode="numeric"
                        autocomplete="one-time-code"
                    />
                    <span v-if="codeForm.errors.code" class="error">{{
                        codeForm.errors.code
                    }}</span>
                </div>
                <button
                    class="btn btn--primary"
                    type="submit"
                    :disabled="codeForm.processing"
                >
                    Continue
                </button>
            </form>

            <form class="stack" @submit.prevent="submitRecovery">
                <div class="field">
                    <label for="recovery_code">Recovery code</label>
                    <input
                        id="recovery_code"
                        v-model="recoveryForm.recovery_code"
                        type="text"
                        name="recovery_code"
                        autocomplete="off"
                    />
                    <span
                        v-if="recoveryForm.errors.recovery_code"
                        class="error"
                        >{{ recoveryForm.errors.recovery_code }}</span
                    >
                </div>
                <button
                    class="btn btn--secondary"
                    type="submit"
                    :disabled="recoveryForm.processing"
                >
                    Use recovery code
                </button>
            </form>
        </div>
    </div>
</template>
