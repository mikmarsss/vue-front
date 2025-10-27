<template>
    <div className="default-container">
        <user-card />
        <div className="main-container">
            <div class="w-[100%]">
                <FileUpload name="files[]"
                    chooseLabel="Выбрать"
                    uploadLabel="Загрузить"
                    cancelLabel="Отменить"
                    :url="uploadUrl"
                    @upload="onAdvancedUpload($event)"
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
        </div>
        <files-panel />
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import UserCard from '../../components/UserCard.vue'
import FilesPanel from './components/FilesPanel.vue';
export default {
    components: { UserCard, FilesPanel },
    methods: {
        onAdvancedUpload() {

        }
    },
    computed: {
        uploadUrl() {
            return `${import.meta.env.VITE_API_URL}/files/upload/${this.authStore.user?.id}`;
        },
        authStore() {
            return useAuthStore();
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