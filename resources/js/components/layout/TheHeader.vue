<script setup>
import AuthButton from '../buttons/AuthButton.vue';


// vajaks mudimist autentimise osas!

defineProps({
    canRegister: {
        type: Boolean,
        default: true,  // vaikimisi arenduse jaoks määratud true NB! Ei saa arendada enne, kui userStore KAN-43 mestimata
    },
});
</script>
<template>
    <header class="app-header" role="banner">
        <div class="row">
            <h1>Saare Pickleball</h1>
            <div class="buttons">
                <div class="buttons" v-if="canRegister">
                    <AuthButton label="Log in" href="/login" />
                    <AuthButton label="Register" href="/register" v-if="canRegister"/>
                </div>
                <!-- Siin näita ka isiku nime, kui arendus sinnani jõudnud on -->
                <AuthButton v-else label="Log out" href="/logout"></AuthButton>
                </div>
            </div>
    </header>
</template>

<style scoped>
.app-header {
    background-color: #abf0d1;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
}
.buttons {
    margin-left: auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 0.75rem;
    align-items: right;
}
</style>