<template>
  <div>
    <div>
      <Panel header="Header"
        toggleable
        style="width: 100%">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="font-bold">{{ authStore.user?.name }}</span>
          </div>
        </template>
        <div v-if="authStore.isAuthenticated && authStore.isAdmin"
          class="flex flex-col gap-[10px]">
          <Button label="Админ панель"
            @click="showAdminPanel"
            class="ml-0"
            severity="success" />
          <div v-if="isShowAdminPanel"
            className="card">
            <div class="flex gap-[10px]">
              <Button label="Посмотреть все загруженные файлы"
                @click="adminPanelNavigator('AllFiles')"
                severity="success" />
              <Button label="Статистика загруженных файлов"
                @click="adminPanelNavigator('Statistic')"
                severity="success" />
              <Button label="История действий пользователей"
                @click="adminPanelNavigator('Logging')"
                severity="success" />
            </div>
          </div>
        </div>
        <template #footer>
          <div class="
            flex 
            item-center">
            <div class="flex flex-col gap-2 w-full">
              <div class="flex"
                v-if="authStore.isAuthenticated">
                <Button label="Все файлы"
                  :severity="fileStore.activeFilter === 'all' ? 'success' : 'secondary'"
                  variant="outlined"
                  icon="pi pi-file"
                  @click="setActiveFilter('all')" />
                <Button label="Фото"
                  :severity="fileStore.activeFilter === 'image' ? 'success' : 'secondary'"
                  variant="outlined"
                  icon="pi pi-images"
                  @click="setActiveFilter('image')" />
                <Button label="Документы"
                  :severity="fileStore.activeFilter === 'document' ? 'success' : 'secondary'"
                  variant="outlined"
                  icon="pi pi-file-word"
                  @click="setActiveFilter('document')" />

              </div>
              <div class="flex justify-between">
                <p v-if="authStore.isAuthenticated"
                  class="font-bold flex gap-[10px] items-center">Размер от:
                  <InputText type="number"
                    class="w-[200px]"
                    v-model="fileSizeFrom"
                    @input="handleSizeChange" />
                  до
                  <InputText type="number"
                    class="w-[200px]"
                    v-model="fileSizeTo"
                    @input="handleSizeChange" />
                  КБ

                </p>
                <div class="flex gap-2">
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
import { useFileStore } from '@/stores/fileStore';
import AuthComponent from './AuthComponent.vue';
import router from '@/router';
export default {
  data() {
    return {
      isLoginModalOpen: false,
      isShowAdminPanel: false,
      fileSizeFrom: 0,
      fileSizeTo: 0
    }
  },
  components: {
    AuthComponent
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    fileStore() {
      return useFileStore();
    }
  },
  methods: {
    openLoginWindow() {
      this.isLoginModalOpen = true
    },
    showAdminPanel() {
      this.isShowAdminPanel = !this.isShowAdminPanel
    },
    closeLoginWindow() {
      this.isLoginModalOpen = false
    },
    setActiveFilter(filter) {
      this.fileStore.setActiveFilter(filter);
    },
    adminPanelNavigator(path) {
      router.push({ name: path })
    },
    async logout() {
      try {
        this.authStore.logout()
        this.$toast.add({
          severity: 'success',
          summary: 'Успешная выход',
          detail: 'Вы успешно вышли из системы!',
          life: 3000,
        })
      } catch (e) {
        console.log(e)
      }
    },
    applySizeFilter() {
      const fromInBytes = this.fileSizeFrom ? this.fileSizeFrom * 1024 : null;
      const toInBytes = this.fileSizeTo ? this.fileSizeTo * 1024 : null;
      this.fileStore.setFileSizeFilter(fromInBytes, toInBytes);
    },
    handleSizeChange() {
      if (this.fileSizeFrom !== null && this.fileSizeTo !== null) {
        this.applySizeFilter();
      }
    }
  },
}
</script>
