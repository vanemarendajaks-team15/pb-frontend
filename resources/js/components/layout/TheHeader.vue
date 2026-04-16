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
            <img src="../../assets/ball.png" alt="Pickleball ball" width="80px"/>
            <h1>PICKLEBALL LIVESCORE</h1>
            <div class="buttons">
                <div class="double-buttons" v-if="canRegister">
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
.double-buttons, .buttons {
    margin-left: auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 0.75rem;
    align-items: right;
}
.row {
    position: relative;
    display: flex;
    align-items: center;
}

h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
}
</style>