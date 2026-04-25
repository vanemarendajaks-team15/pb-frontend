<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthButton from '../../components/buttons/AuthButton.vue';
import TheHeader from '../../components/layout/TheHeader.vue';
import BaseCard from '../../components/ui/BaseCard.vue';

const form = useForm({
    firstName: '',
    lastName: '',
    sex: 'M',
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
    <TheHeader />
    <div class="page">
        <BaseCard>
            <div class="stack stack--lg">
                <h1>Register</h1>

                <form class="stack" @submit.prevent="submit">
                    <div class="field">
                        <label for="firstName">First name</label>
                        <input
                            id="firstName"
                            v-model.trim="form.firstName"
                            type="text"
                            name="firstName"
                            required
                            autocomplete="given-name"
                        />
                        <span v-if="form.errors.firstName" class="error">{{
                            form.errors.firstName
                        }}</span>
                    </div>

                    <div class="field">
                        <label for="lastName">Last Name</label>
                        <input
                            id="lastName"
                            v-model.trim="form.lastName"
                            type="text"
                            name="lastName"
                            required
                            autocomplete="family-name"
                        />
                        <span v-if="form.errors.lastName" class="error">{{
                            form.errors.lastName
                        }}</span>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="Male" id="Male" v-model="form.sex" value="M" checked>
                        <label class="form-check-label" for="Male">
                            Male
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="Female" id="Female" v-model="form.sex" value="F">
                        <label class="form-check-label" for="Female">
                            Female
                        </label>
                    </div>


                    <div class="field">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            v-model.trim="form.email"
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

                    <AuthButton
                        class="btn btn--primary"
                        type="submit"
                        label="Register"
                        :disabled="form.processing"
                    />
                </form>

                <div class="row">
                    <Link href="/login">Already registered?</Link>
                </div>
            </div>
        </BaseCard>
    </div>
</template>
