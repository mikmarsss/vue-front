<template>
    <div class="w-[100%]">
        <Panel header="Header"
            toggleable
            collapsed
            style="width: 100%">
            <template #header>
                <div class="flex items-center gap-2">
                    <span class="font-bold">{{ User.name }}</span>

                </div>
            </template>
            <template #footer>
                <files-panel :Files="User.files"
                    :RefreshFiles="RefreshFiles" />
            </template>
            <span class="font-bold">Всего файлов: {{ User.files.length }}</span>
        </Panel>
    </div>
</template>
<script>
import FilesPanel from '../../../components/FilesPanel.vue'
export default {
    components: { FilesPanel },
    data() {
        return {

        }
    },
    props: ['User', 'RefreshFiles'],
}
</script>