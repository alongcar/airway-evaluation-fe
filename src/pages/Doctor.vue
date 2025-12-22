<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">医生专区</h1>
    <p class="text-gray-600 mb-4">这里是仅供医生访问的受保护页面。</p>
    <el-button type="danger" @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { removeAuthToken } from '@/utils/storage.js'
import { ElMessage } from 'element-plus'

const router = useRouter()

const handleLogout = () => {
  removeAuthToken()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>
