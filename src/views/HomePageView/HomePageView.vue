<template>
    <div class="w-[100%]">
        <user-card />
        <div v-if="authStore.isAuthenticated"
            class="w-[100%] 
            mt-[10px]">
            <FileUpload name="files[]"
                chooseLabel="Выбрать"
                uploadLabel="Загрузить"
                cancelLabel="Отменить"
                :url="uploadUrl"
                @upload="onAdvancedUpload()"
                :multiple="true"
                accept="image/*, .pdf, .doc, .docx"
                :withCredentials="true"
                :maxFileSize="1000000"
                invalidFileSizeMessage="Файл слишком большой"
                invalidFileTypeMessage="Недопустимый тип файла"
                emptyFileMessage="Файл пустой"
                chooseOptionsLabel="Выбрать файлы"
                uploadOptionsLabel="Загрузить файлы"
                cancelOptionsLabel="Отменить загрузку">
                <template #empty>
                    <span>Переместите файлы</span>
                </template>
            </FileUpload>
        </div>
        <files-panel :Files="userFiles"
            :RefreshFiles="getAllUserFiles" />
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import UserCard from '../../components/UserCard.vue'
import FilesPanel from '@/components/FilesPanel.vue';
import FilesService from '@/services/filesService';
export default {
    data() {
        return {
            userFiles: [],
        }
    },
    components: { UserCard, FilesPanel },
    methods: {
        async onAdvancedUpload() {
            this.$toast.add({
                severity: 'success',
                summary: 'Успешная загрузка',
                detail: 'Файл успешно загружен!',
                life: 3000,
            })
            this.getAllUserFiles()
        },
        async getAllUserFiles() {
            FilesService.getAllUserFiles(this.authStore.user.id).then((response) => {
                this.userFiles = response.data
            }).catch((error) => {
                console.log(error)
            }).finally(() => { })
        },
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
        uploadUrl() {
            return `${import.meta.env.VITE_API_URL}/files/upload/${this.authStore.user?.id}`;
        },
    },
    async beforeMount() {
        if (this.authStore.user) {
            await this.getAllUserFiles();
        } else {
            this.$watch(
                () => this.authStore.user,
                (user) => {
                    if (user) {
                        this.getAllUserFiles();
                    }
                },
                { immediate: true }
            );
        }
    }
}
</script>
<style scoped>
.default-container {
    width: 100vw;
    height: 100vh;
}
</style>
