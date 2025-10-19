<template>
  <div>
    <div className="main-container">
      <Panel header="Header"
        toggleable
        style="width: 100%">
        <template #header>
          <div class="flex items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle" />
            <span class="font-bold">Amy Elsner</span>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <div class="flex gap-2">
              <Button label="Мои файлы"
                severity="success"
                variant="outlined"
                icon="pi pi-file" />
              <Button label="Фото"
                severity="secondary"
                variant="outlined"
                icon="pi pi-sign-out" />
            </div>
            <div class="flex gap-2">
              <Button label="Настройки"
                severity="secondary"
                variant="outlined"
                icon="pi pi-cog" />
              <Button label="Войти"
                @click="openLoginWindow"
                severity="danger"
                variant="outlined"
                icon="pi pi-sign-out" />
            </div>
          </div>
        </template>
      </Panel>
    </div>
    <AuthComponent :isLoginModalOpen="isLoginModalOpen" />
  </div>
</template>

<script>
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

  },
  methods: {
    openLoginWindow() {
      this.isLoginModalOpen = true
      console.log(this.isLoginModalOpen)
    }
  }
}
</script>
<style scoped></style>
