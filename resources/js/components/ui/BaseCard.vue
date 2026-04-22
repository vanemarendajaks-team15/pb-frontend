<template>
  <div class="base-card" :style="{ maxWidth: width, minHeight: height }">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
    width: {
        type: String,
        default: "90rem"
    },
    height: {
        type: String,
        default: "8rem"
    }
});
</script>


<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 1.5rem;
  background-color: rgba(255, 255, 255, 0.8);
}

</style>