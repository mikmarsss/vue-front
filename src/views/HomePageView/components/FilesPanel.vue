<template>
  <div className="main-container">
    <Panel toggleable
      style="width: 100%">
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold">Мои файлы</span>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <Card style="width: 25rem; overflow: hidden"
            v-for="file in userFiles"
            :key="file.id">
            <template #header>
              <img alt="user header"
                :src="filePreview(file.file)" />
            </template>
            <template #title>Advanced Card</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
              <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                esse, cupiditate neque
                quas!
              </p>
            </template>
            <template #footer>
              <div class="flex gap-4 mt-1">
                <Button label="Cancel"
                  severity="secondary"
                  variant="outlined"
                  class="w-full" />
                <Button label="Save"
                  class="w-full" />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import FilesService from '@/services/filesService';
import { useAuthStore } from '@/stores/user';

export default {
  data() {
    return {
      userFiles: [],

    }
  },
  methods: {
    async getAllUserFiles() {
      FilesService.getAllUserFiles(this.authStore.user.id).then((response) => {
        this.userFiles = response.data
        console.log(response)
      }).catch((error) => {
        console.log(error)
      }).finally(() => { })
    },
    filePreview(fileUrl) {
      return `${import.meta.env.VITE_API_URL}/${fileUrl}`
    }

  },
  computed: {
    authStore() {
      return useAuthStore();
    },

  },
  beforeMount() {
    console.log(this.authStore.user)
    this.getAllUserFiles()
  }
}
</script>

<style scoped></style>