<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 flex flex-col items-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <img src="https://ai-public.mastergo.com/ai/img_res/b5fb4f2daecc62cfb82db04d61c7c673.jpg" alt="Medical Tech Background" class="w-full h-full object-cover opacity-10">
    </div>

    <!-- Header Section -->
    <header class="w-full py-6 px-8 flex justify-between items-center z-10">
      <div></div>
      <div class="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
        <i class="fas fa-user-md text-xl"></i>
        <span class="font-sans text-sm whitespace-nowrap">医生登录 Doctor Login</span>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="flex flex-col items-center justify-center mt-16 mb-24 px-8 text-center z-10 max-w-4xl mx-auto">
      <h1 class="text-5xl md:text-6xl font-bold text-blue-900 mb-4 leading-tight tracking-wide">
        气道评估系统<br><span class="text-3xl md:text-4xl font-light text-gray-700">Airway Assessment System</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-10 font-light">
        智能化医疗解决方案 | Intelligent Medical Solution
      </p>

      <!-- Input Module -->
      <div class="relative w-full max-w-lg">
        <div class="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-300">
          <i class="fas fa-search ml-4 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="请输入10位病案号 Enter Case Number"
            maxlength="10"
            class="w-full py-4 pl-3 pr-16 outline-none text-base border-none placeholder-gray-400"
            v-model="caseNumber"
          />
          <span class="absolute right-4 text-xs text-gray-500">{{ caseNumber.length }} / 10</span>
        </div>
        <button
          @click="handleSearch"
          :disabled="caseNumber.length !== 10"
          class="mt-6 px-8 py-3 bg-blue-600 text-white font-medium rounded-button whitespace-nowrap shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          查询 Search
        </button>
      </div>
    </main>

    <!-- Features Section -->
    <section class="py-16 px-8 w-full bg-white bg-opacity-80 backdrop-blur-sm z-10">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="mb-4 flex justify-center">
            <img src="https://ai-public.mastergo.com/ai/img_res/609c1d8e783acb90230b67e4b6391ca3.jpg" alt="AI Analysis" class="w-full h-40 object-cover rounded-lg">
          </div>
          <h3 class="text-xl font-semibold text-blue-900 mb-2">智能分析</h3>
          <p class="text-gray-600">基于人工智能算法的气道图像深度解析技术，辅助临床诊断决策。</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="mb-4 flex justify-center">
            <img src="https://ai-public.mastergo.com/ai/img_res/41f1dd2d7ff6b26c9f2489cda7abe018.jpg" alt="Data Visualization" class="w-full h-40 object-cover rounded-lg">
          </div>
          <h3 class="text-xl font-semibold text-blue-900 mb-2">可视化报告</h3>
          <p class="text-gray-600">一键生成结构化评估报告，直观展示关键指标变化趋势。</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="mb-4 flex justify-center">
            <img src="https://ai-public.mastergo.com/ai/img_res/5f2f1d7773138ce151cc61133a1ec518.jpg" alt="Cloud Storage" class="w-full h-40 object-cover rounded-lg">
          </div>
          <h3 class="text-xl font-semibold text-blue-900 mb-2">云端存储</h3>
          <p class="text-gray-600">采用银行级加密标准保护患者隐私数据，支持跨平台访问。</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full py-8 text-center text-gray-500 text-sm z-10">
      © 2025 Airway Assessment System. All rights reserved.
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const caseNumber = ref('');

function handleSearch() {
  if (caseNumber.value.length === 10) {
    alert(`正在查询病案号：${caseNumber.value}`);
  }
}
</script>

<style scoped>
body {
  min-height: 1024px;
}
</style>

