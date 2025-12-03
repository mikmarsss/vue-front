<template>
    <div class="w-[100%]">
        <user-card />
        <Panel header="Header"
            toggleable
            class="mt-[10px]"
            style="width: 100%">
            <template #header>
                <div class="flex items-center gap-2">
                    <span class="font-bold">Все пользователи</span>
                </div>
            </template>

            <template #footer>
                <UserCardForStatistic v-for="user in allUsers"
                    :key="user.id"
                    :User="user"
                    :RefreshFiles="getAllUsersWithFiles" />
            </template>
        </Panel>
    </div>
</template>

<script>
import FilesService from '@/services/filesService';
import { useAuthStore } from '@/stores/user';
import { useFileStore } from '@/stores/fileStore';
import UserCardForStatistic from './components/UserCardForStatistic.vue';

export default {
    components: { UserCardForStatistic },

    data() {
        return {
            allUsers: [],
            currentPage: 1
        }
    },
    methods: {
        async getAllUsersWithFiles() {
            FilesService.getAllUsersWithFiles().then((response) => {
                this.allUsers = response.data
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
            await this.getAllUsersWithFiles();
        } else {
            this.$watch(
                () => this.authStore.user,
                (user) => {
                    if (user) {
                        this.getAllUsersWithFiles();
                    }
                },
                { immediate: true }
            );
        }
    }
}
</script>