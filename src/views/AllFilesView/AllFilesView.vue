<template>
    <div class="w-[100%]">
        <user-card />
        <files-panel :Files="allFiles"
            :RefreshFiles="getAllFiles" />
    </div>
</template>

<script>
import FilesService from '@/services/filesService';
import { useAuthStore } from '@/stores/user';
import UserCard from '../../components/UserCard.vue';
import { useFileStore } from '@/stores/fileStore';
import FilesPanel from '@/components/FilesPanel.vue';

export default {
    components: { UserCard, FilesPanel },

    data() {
        return {
            allFiles: [],
            currentPage: 1
        }
    },
    methods: {
        async getAllFiles() {
            FilesService.getAllFiles().then((response) => {
                this.allFiles = response.data
            })
        },
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
        fileStore() {
            return useFileStore();
        },
    },
    async beforeMount() {
        if (this.authStore.user) {
            await this.getAllFiles();
        } else {
            this.$watch(
                () => this.authStore.user,
                (user) => {
                    if (user) {
                        this.getAllFiles();
                    }
                },
                { immediate: true }
            );
        }
    }
}
</script>