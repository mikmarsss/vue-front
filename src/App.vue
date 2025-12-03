<template>
  <div id="app"
    className="main-container">
    <router-view></router-view>
    <Toast />
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/user';

const authStore = useAuthStore();

onMounted(async () => {

  await authStore.refreshUser();

});
</script>
<style>
.main-container {
  width: 50vw;
  max-width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding-top: 10px;

  @media (max-width: 768px) {
    width: 90vw;
    max-width: 90%;
  }
}
</style>