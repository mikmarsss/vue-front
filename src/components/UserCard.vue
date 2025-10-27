<template>
  <div>
    <div className="main-container">
      <Panel header="Header"
        toggleable
        style="width: 100%">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="font-bold">{{ authStore.user?.name }}</span>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <div class="flex gap-2">
              <Button label="Все файлы"
                severity="success"
                variant="outlined"
                icon="pi pi-file" />
              <Button label="Фото"
                severity="secondary"
                variant="outlined"
                icon="pi pi-images" />
            </div>
            <div class="flex gap-2">
              <Button label="Настройки"
                severity="secondary"
                variant="outlined"
                icon="pi pi-cog" />
              <Button v-if="!authStore.isAuthenticated"
                label="Войти"
                @click="openLoginWindow"
                severity="success"
                variant="outlined"
                icon="pi pi-sign-in" />
              <Button v-if="authStore.isAuthenticated"
                label="Выйти"
                @click="logout"
                severity="danger"
                variant="outlined"
                icon="pi pi-sign-out" />
            </div>
          </div>
        </template>
      </Panel>
    </div>
    <AuthComponent :isLoginModalOpen="isLoginModalOpen"
      @closeLoginWindow="closeLoginWindow" />
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import AuthComponent from './AuthComponent.vue';
export default {
  data() {
    return {
      isLoginModalOpen: false,

    }
  },
  components: {
    AuthComponent
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  },
  methods: {
    openLoginWindow() {
      this.isLoginModalOpen = true
    },
    closeLoginWindow() {
      this.isLoginModalOpen = false
    },
    logout() {
      this.authStore.logout()
    },
  },
}
</script>
