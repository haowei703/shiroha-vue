<template>
    <form id="loginForm">
        <div class="flex min-h-full w-80 flex-1 flex-col justify-center lg:px-3">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    登录
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="space-y-6">
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" v-model="loginForm.email"
                            placeholder="邮箱或用户名"
                            class="block w-full h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-rg-blue sm:text-sm sm:leading-6" />
                    </div>

                    <div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                v-model="loginForm.password" placeholder="密码"
                                class="block w-full h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-rg-blue sm:text-sm sm:leading-6" />
                        </div>
                        <div class="flex items-center justify-end">
                            <div class="text-sm mt-2">
                                <a href="#" class="font-semibold text-blue-500 hover:text-blue-400">忘记密码?</a>
                            </div>
                        </div>
                    </div>

                    <div class="h-auto">
                        <button
                            :class="['w-full h-12 rounded-xl text-white font-semibold', disabled ? 'bg-blue-200 ' : 'bg-blue-400 ']"
                            type="button" :loading="loading" :disabled="disabled" @click="loginRequest">登录
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center w-full justify-end mb-3">
                <p class="mt-10 text-center text-sm text-gray-500">
                    没有账户？
                    <button link @click="handleClick">
                        <p class="font-semibold text-center text-blue-500 hover:text-blue-400">注册</p>
                    </button>
                </p>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { login } from '@/api/services/userservices'
const router = useRouter()
const loading = ref(false)
const store = useStore()
// 登录表单ref
const loginForm = ref({
    email: '',
    password: ''
})

// 按钮禁用控制变量
const disabled = computed(() => {
    return !(loginForm.value.email && loginForm.value.password)
})

// 发起登录请求
const loginRequest = () => {
    loading.value = true
    login({ email: loginForm.value.email, password: loginForm.value.password }).then(() => {
        loading.value = false
        store.reload()
        router.push('/')
    }).catch((reason) => {
        window.alert(reason)
    })
}

// 事件
const emits = defineEmits(['toggleMode']);
const handleClick = () => {
    // 触发定义的事件
    emits('toggleMode');
}
</script>