<template>
    <div className="default-container">
        <user-card />
        <files-panel />
    </div>
</template>

<script>
import UserCard from '../../components/UserCard.vue'
import FilesPanel from './components/FilesPanel.vue';
export default {
    components: { UserCard, FilesPanel },

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