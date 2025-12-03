<template>
  <div class="mt-[10px]">
    <Panel toggleable
      v-if="authStore.isAuthenticated"
      style="width: 100%">
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold">Все файлы</span>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-wrap gap-[10px]">
          <Card style="width: 15rem; overflow: hidden"
            v-for="file in paginatedFiles"
            :key="file.id">
            <template #header>
              <div class="object-cover h-[100px] flex justify-center">
                <img v-if="file.contentType === 'image'"
                  alt="user header"
                  :src="filePreview(file)" />
                <i v-else
                  class="pi pi-file"
                  style="font-size: 6.5rem"></i>
              </div>

            </template>
            <template #title>A{{ file.name }}</template>
            <template #subtitle>
              <div>
                {{ fileSize(file.size) }}
              </div>
            </template>
            <template #footer>
              <div class="flex gap-4 mt-1">
                <Button label="Удалить"
                  severity="danger"
                  variant="outlined"
                  class="w-full"
                  @click="deleteFile(file.id)" />
                <Button label="Скачать"
                  @click="downloadFile(file.id, authStore.user.id)"
                  class="w-full" />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
    <Paginator v-if="allFiles.length > 0"
      :rows="10"
      :totalRecords="allFiles.length"
      @page="onPageChange"></Paginator>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import { useFileStore } from '@/stores/fileStore';
import FilesService from '@/services/filesService';

export default {
  data() {
    return {
      allFiles: [],
      currentPage: 1
    }
  },
  props: ['Files', 'RefreshFiles'],
  methods: {
    filePreview(file) {
      return `${import.meta.env.VITE_API_URL_STATIC}/${file.file ?? file.fileName}`
    },
    fileSize(size) {
      return `${(size / 1024).toFixed(2)} Кб`
    },
    onPageChange(event) {
      this.currentPage = event.page + 1;
      this.paginatedFiles(this.currentPage);
    },
    async deleteFile(fileId) {
      FilesService.deleteUserFile(fileId).then(() => {
        this.$toast.add({
          severity: 'success',
          summary: 'Успешное удаление',
          detail: 'Файл успешно удален!',
          life: 3000,
        })
        this.RefreshFiles()
      }).catch((error) => {
        console.log(error)
      }).finally(() => { })
    },
    async downloadFile(fileId, userId) {
      FilesService.downloadUserFile(fileId, userId).then((response) => {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const contentDisposition = response.headers.get('content-disposition');
        let fileName = `file-${fileId}.dat`;

        if (contentDisposition) {
          let fileNameMatch = contentDisposition.match(/filename="([^"]+)"/);

          if (!fileNameMatch) {
            fileNameMatch = contentDisposition.match(/filename=([^;]+)/);
          }

          if (!fileNameMatch) {
            fileNameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/);
          }

          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1].trim();
            fileName = fileName.replace(/^"|"$/g, '');
          }
        }

        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log('Файл скачан:', fileName);

      }).catch((error) => {
        console.log(error)
      }).finally(() => { })
    },
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    paginatedFiles() {
      console.log(this.currentPage)
      const startIndex = (this.currentPage - 1) * 10
      const endIndex = startIndex + 10
      return this.filteredFiles.slice(startIndex, endIndex)
    },
    fileStore() {
      return useFileStore();
    },
    filteredFiles() {
      let filtered = this.allFiles;
      if (this.fileStore.activeFilter === 'image') {
        filtered = this.allFiles.filter(file => file.contentType === 'image')
      }
      if (this.fileStore.activeFilter === 'document') {
        filtered = this.allFiles.filter(file => file.contentType === 'document')
      }
      if (this.fileStore.fileSizeFrom !== null || this.fileStore.fileSizeTo !== null) {
        filtered = filtered.filter((file) => {
          const fileSize = file.size || 0;

          let fromCondition = true;
          let toCondition = true;

          if (this.fileStore.fileSizeFrom !== null) {
            fromCondition = fileSize >= Number(this.fileStore.fileSizeFrom);
          }

          if (this.fileStore.fileSizeTo !== null) {
            toCondition = fileSize <= Number(this.fileStore.fileSizeTo);
          }

          return fromCondition && toCondition;
        });
      }
      return filtered
    },
  },
  watch: {
    Files: {
      handler() {
        console.log(this.Files)
        this.allFiles = this.Files
      },
      deep: true,
      immediate: true
    }
  }
}
</script>