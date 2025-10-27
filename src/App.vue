<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/user';

const authStore = useAuthStore();

onMounted(async () => {
  if (localStorage.getItem('authToken')) {
    await authStore.refreshUser();
  }
});
</script>