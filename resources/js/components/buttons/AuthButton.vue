<template>
  <Link v-if="href" :href="href" class="btn">{{ label }}</Link>
  <button v-else :type="type" class="btn">{{ label }}</button>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  label: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  }
});

</script>

<style scoped>
.btn {
  padding: 10px 22px;
  border: 1.5px solid #111;
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
  color: inherit;
}
.btn:hover { background: rgba(0, 0, 0, 0.2); }
</style>