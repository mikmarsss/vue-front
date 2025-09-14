<template>
    <div className="container">
        <user-card/>
    </div>
</template>
    
<script>
import UserCard from '../../components/UserCard.vue'
export default {
  components: { UserCard },
    
}
</script>

<style scoped>
     .container {
        width: 50vw; 
        max-width: 50%; 
        margin: 0 auto; 
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        @media (max-width: 768px) {
            width: 90vw;
            max-width: 90%;
        }
    }
</style>