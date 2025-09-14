<template>
  <div className="user-card-container">
    <Panel header="Header" toggleable style="width: 100%">
      <template #header>
        <div class="flex items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">Amy Elsner</span>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
            <div class="flex gap-2">
                <Button label="Мои файлы" severity="success" variant="outlined" icon="pi pi-file" />
            <Button label="Фото" severity="secondary" variant="outlined" icon="pi pi-sign-out" />
            </div>
          <div class="flex gap-2">
            <Button label="Настройки" severity="secondary" variant="outlined" icon="pi pi-cog" />
            <Button label="Выйти" severity="danger" variant="outlined" icon="pi pi-sign-out" />
          </div>
        </div>
      </template>

    </Panel>
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
.user-card-container {
  width: 100%;
}
</style>
