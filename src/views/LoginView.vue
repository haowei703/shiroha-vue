<template>
  <div :class="['bg-cover bg-center w-screen h-screen bg-fixed fixed top-0 -z-10', currentBg]">
  </div>
  <div :class="['bg-cover bg-center w-screen h-screen bg-fixed fixed top-0 -z-20', nextBg]">
  </div>
  <div class="w-screen h-screen bg-transparent overflow-auto flex items-center min-h-20 min-w-36">
    <div class="rounded-2xl w-auto h-auto px-8 pt-9 pb-4 text-center bg-white m-auto shadow-lg">
      <div v-if="isLoginMode" class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <!-- 登录表单 -->
        <LoginForm @toggleMode="toggleMode(false)" />
      </div>

      <div v-else class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <!-- 注册表单 -->
        <SignUpForm @toggleMode="toggleMode(true)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import anime from 'animejs/lib/anime.es.js'


const isMobile = window.innerWidth <= 800; // 判断是否为手机
const landscapeBackgrounds = Array.from({ length: 5 }, (_, i) => `bg-ld-${i}`);
const portraitBackgrounds = Array.from({ length: 9 }, (_, i) => `bg-pd-${i}`);
const backgrounds = ref(isMobile ? portraitBackgrounds : landscapeBackgrounds);
console.log(landscapeBackgrounds)
console.log(portraitBackgrounds)

let intervalId: NodeJS.Timeout | null = null


const currentIndex = ref(0)
// 当前背景图片的tailwindcss类名
const currentBg = computed(() => backgrounds.value[currentIndex.value])
const nextBg = computed(() => backgrounds.value[(currentIndex.value + 1) % backgrounds.value.length])

console.log(`bg-[url(${currentBg.value}]`)
const fadeTransition = () => {
  // 淡出当前图片
  anime({
    targets: `.${currentBg.value}`,
    opacity: [1, 0],
    duration: 500,
    easing: 'easeInOutQuad',
  })
  currentIndex.value = (currentIndex.value + 1) % backgrounds.value.length
}

onMounted(() => {
  // 定时器控制动画，首次动画后等待10秒
  intervalId = setInterval(fadeTransition, 10000);
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// 标识登录和注册
const isLoginMode = ref(true)
const toggleMode = (value: boolean) => {
  isLoginMode.value = value
}

</script>