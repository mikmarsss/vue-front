<template>
    <div className="auth-modal"
        v-show="isLoginModalOpen">
        <div className="auth-container">
            <div class="card grid grid-cols-1 gap-4">
                <p class="text-[22px]">{{ authLabelType }}</p>
                <InputGroup v-if="authLabelType == 'Регистрация'">
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText v-model="username"
                        placeholder="Username" />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-at"></i>
                    </InputGroupAddon>
                    <InputText type="email"
                        v-model="email"
                        placeholder="Email"
                        :invalid="!isValidEmail" />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-key"></i>
                    </InputGroupAddon>
                    <InputText :invalid="!isValidPassword"
                        type="password"
                        v-model="password"
                        placeholder="Password" />
                </InputGroup>
                <Button :disabled="!isAuthButtonDisabled"
                    :label="authButtonType"
                    @click="authorize" />
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '@/stores/user';


export default {

    data() {
        return {
            password: null,
            email: null,
            username: null,
        }
    },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    components: {},
    props: {
        isLoginModalOpen: {
            type: Boolean,
            default: false,
        },
        closeLoginWindow: {
            type: Function
        }
    },
    computed: {
        authButtonType() {
            return 'Войти'
        },
        authLabelType() {
            return 'Вход'
        },
        isValidPassword() {
            return this.password && this.password.length >= 6;
        },
        isValidEmail() {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(this.email);
        },
        isAuthButtonDisabled() {
            return this.isValidPassword && this.isValidEmail
        }
    },
    methods: {
        async authorize() {
            const payload = {
                name: this.username,
                email: this.email,
                password: this.password
            }
            if (this.authLabelType === "Регистрация") {
                try {
                    await this.authStore.registration(payload)
                    this.$emit('closeLoginWindow')
                } catch (error) {
                    console.error('Auth error:', error);
                }
            }
            if (this.authLabelType === "Вход") {
                try {
                    await this.authStore.login(payload)
                    this.$emit('closeLoginWindow')
                } catch (error) {
                    console.error('Auth error:', error);
                }
            }

        }
    }
}
</script>
<style scoped>
.auth-modal {
    position: absolute;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    transform: translate(-50%, -50%);
}

.auth-container {
    position: absolute;
    z-index: 12;
    width: 20vw;
    height: 30vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
