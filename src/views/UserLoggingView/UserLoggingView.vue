<template>
    <div class="w-[100%]">
        <user-card />
        <div class="card mt-[10px]">
            <Button label="Скачать"
                @click="downloadFile()"
                class="w-full" />
            <DataTable :value="allLogging"
                tableStyle="min-width: 50rem">
                <Column field="userName"
                    header="Имя пользователя"></Column>
                <Column field="action"
                    header="Действие"></Column>
                <Column field="createdAt"
                    header="Дата и время">
                    <template #body="{ data }">
                        {{ formatDate(data.createdAt) }}
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script>
import { useAuthStore } from '@/stores/user';
import { useFileStore } from '@/stores/fileStore';
import LoggingService from '@/services/loggingService';

export default {

    data() {
        return {
            allLogging: [],
        }
    },
    methods: {
        async getAllLoggs() {
            LoggingService.getAllUsersActions().then((response) => {
                this.allLogging = response.data
            })
        },
        formatDate(dateString) {
            if (!dateString) return '';

            const date = new Date(dateString);

            return date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        async downloadFile() {
            LoggingService.downloadUserActionsFile().then((response) => {
                const blob = new Blob([response.data]);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                const contentDisposition = response.headers.get('content-disposition');
                let fileName = `file-logged-actions.dat`;

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
        fileStore() {
            return useFileStore();
        },
    },
    async beforeMount() {
        if (this.authStore.user) {
            await this.getAllLoggs();
        } else {
            this.$watch(
                () => this.authStore.user,
                (user) => {
                    if (user) {
                        this.getAllLoggs();
                    }
                },
                { immediate: true }
            );
        }
    }
}
</script>