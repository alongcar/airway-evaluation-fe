<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-10">
      <img src="@/assets/images/login_bg.jpg" alt="" class="w-full h-full object-cover object-center">
    </div>
    <header class="w-full max-w-6xl flex justify-between items-center py-6 z-10">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">气道评估系统</h1>
        <p class="text-sm text-gray-600">Airway Assessment System</p>
      </div>
      <a href="/" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
        <i class="fas fa-home mr-2"></i>返回首页
      </a>
    </header>
    <main class="flex-grow flex items-center justify-center w-full max-w-md z-10">
      <div class="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full border border-gray-200">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">医生登录</h2>
          <p class="text-gray-600">Doctor Login</p>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input id="username" type="text" placeholder="请输入工号或邮箱" v-model="loginForm.username" class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input id="password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" v-model="loginForm.password" class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
              <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <i :class="showPassword ? 'fas fa-eye-slash text-gray-400' : 'fas fa-eye text-gray-400'"></i>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" v-model="loginForm.rememberMe" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">记住我</label>
            </div>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">忘记密码？</a>
          </div>
          <button type="submit" class="!rounded-button whitespace-nowrap w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            立即登录
          </button>
        </form>
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <i class="fas fa-shield-alt"></i>
            <span>安全认证登录 | 医疗数据加密保护</span>
          </div>
        </div>
      </div>
    </main>
    <footer class="w-full max-w-6xl py-6 text-center text-xs text-gray-500 z-10">
      <p>© 2025 气道评估系统. All rights reserved.</p>
      <p class="mt-1">技术支持：智竹医疗科技有限公司 | 备案号：京ICP备XXXXXXXX号</p>
    </footer>
    <div class="absolute bottom-20 left-10 opacity-20 transform rotate-12">
      <img src="https://ai-public.mastergo.com/ai/img_res/055190c1c710158ddfa6610014261948.jpg" alt="" class="w-24 h-24 object-contain">
    </div>
    <div class="absolute top-1/4 right-20 opacity-15 transform -rotate-12">
      <img src="https://ai-public.mastergo.com/ai/img_res/e0b8f864df3e6b38947efcecff5fb33e.jpg" alt="" class="w-32 h-32 object-contain">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setAuthToken } from '@/utils/storage.js'
import { ElMessage } from 'element-plus'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  if (loginForm.value.username && loginForm.value.password) {
    setAuthToken({
      access_token: 'dummy_access_token',
      refresh_token: 'dummy_refresh_token'
    })
    ElMessage.success('登录成功')
    router.push('/doctor')
  } else {
    ElMessage.warning('请输入用户名和密码')
  }
}
</script>
