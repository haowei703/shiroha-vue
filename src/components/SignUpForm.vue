<template>
    <form id="signupForm">
        <div class="flex min-h-full w-80 flex-1 flex-col justify-center lg:px-3">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    注册账号
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="space-y-6">
                    <div>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email"
                                v-model="registerForm.email" placeholder="邮箱地址"
                                class="block w-full h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-rg-blue sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                required="true" placeholder="密码" v-model="registerForm.password"
                                class="block w-full h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-rg-blue sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="h-auto">
                        <button
                            :class="['w-full h-12 rounded-xl text-white font-semibold', disabled ? 'bg-blue-200 ' : 'bg-blue-400 ']"
                            type="button" :disabled="disabled" @click="registerRequest">登录
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center w-full justify-end mb-3">
                <p class="mt-10 text-center text-sm text-gray-500">
                    已有账号？
                    <button type="button" @click="handleClick">
                        <p class="font-semibold text-center text-blue-500 hover:text-blue-400">登录</p>
                    </button>
                </p>
            </div>
        </div>
    </form>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue'
import { register } from '@/api/services/userservices'

const registerForm = ref({
    email: '',
    username: '',
    password: '',
})

const disabled = computed(() => {
    return !registerForm.value.email
})

const emits = defineEmits(['toggleMode']);
const handleClick = () => {
    // 触发定义的事件
    emits('toggleMode');
}


const registerRequest = () => {
    register({ email: registerForm.value.email, password: registerForm.value.password, code: 1 })
}
</script>