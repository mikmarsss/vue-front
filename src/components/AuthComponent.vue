<template>
    <div className="auth-modal"
        v-show="isLoginModalOpen">
        <div className="auth-container">


            <Panel class="border-1">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText v-model="text1"
                        placeholder="Username" />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <InputNumber v-model="number"
                        placeholder="Price" />
                    <InputGroupAddon>.00</InputGroupAddon>
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>www</InputGroupAddon>
                    <InputText v-model="text2"
                        placeholder="Website" />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-map"></i>
                    </InputGroupAddon>
                    <Select v-model="selectedCity"
                        :options="cities"
                        optionLabel="name"
                        placeholder="City" />
                </InputGroup>
            </Panel>
        </div>
    </div>
</template>
<script>
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
export default {

    data() {
        return {


        }
    },
    components: { InputGroup, InputGroupAddon },
    props: {
        isLoginModalOpen: {
            type: Boolean,
            default: false,
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>
<style scoped>
.auth-modal {
    position: absolute;
    z-index: 10;
    opacity: 0.7;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    background-color: black;
    transform: translate(-50%, -50%);
}

.auth-container {
    position: absolute;
    width: 20vw;
    height: 30vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
