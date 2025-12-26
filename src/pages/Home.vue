<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 flex flex-col items-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <img src="@/assets/images/index_bg.jpg" alt="Medical Tech Background" class="w-full h-full object-cover opacity-10">
    </div>

    <!-- Header Section -->
    <header class="w-full py-6 px-8 flex justify-between items-center z-10">
      <div></div>
      <div v-if="isLoggedIn" class="flex flex-col items-end gap-5">
        <div @click="router.push('/evaluation-results')" class="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
           <i class="fas fa-clipboard-list text-xl"></i>
           <span class="font-sans text-sm whitespace-nowrap">查看评估结果 View Results</span>
        </div>
        <div @click="handleLogout" class="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
           <i class="fas fa-sign-out-alt text-xl"></i>
           <span class="font-sans text-sm whitespace-nowrap">退出登录 Logout</span>
        </div>
      </div>
      <router-link v-else to="/doctor">
        <div class="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
          <i class="fas fa-user-md text-xl"></i>
          <span class="font-sans text-sm whitespace-nowrap">医生登录 Doctor Login</span>
        </div>
      </router-link>
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
        <div class="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-300 bg-white">
          <i class="fas fa-search ml-4 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="请输入10位病案号 Enter Admission Number"
            maxlength="10"
            class="w-full py-4 pl-3 pr-16 outline-none text-base border-none placeholder-gray-400 bg-transparent"
            v-model="caseNumber"
            @input="handleNativeInput"
          />
          <span class="absolute right-4 text-xs text-gray-500">{{ caseNumber.length }} / 10</span>
        </div>
        <button
          @click="checkCaseNumber"
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
            <img src="@/assets/images/ai_analysis.jpg" alt="AI Analysis" class="w-full h-40 object-cover rounded-lg">
            <!-- <img src="https://ai-public.mastergo.com/ai/img_res/609c1d8e783acb90230b67e4b6391ca3.jpg" alt="AI Analysis" class="w-full h-40 object-cover rounded-lg"> -->
          </div>
          <h3 class="text-xl font-semibold text-blue-900 mb-2">智能分析</h3>
          <p class="text-gray-600">基于人工智能算法的气道图像深度解析技术，辅助临床诊断决策。</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="mb-4 flex justify-center">
            <img src="@/assets/images/ai_report.jpg" alt="AI Report" class="w-full h-40 object-cover rounded-lg">
            <!-- <img src="https://ai-public.mastergo.com/ai/img_res/41f1dd2d7ff6b26c9f2489cda7abe018.jpg" alt="Data Visualization" class="w-full h-40 object-cover rounded-lg"> -->
          </div>
          <h3 class="text-xl font-semibold text-blue-900 mb-2">可视化报告</h3>
          <p class="text-gray-600">一键生成结构化评估报告，直观展示关键指标变化趋势。</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="mb-4 flex justify-center">
            <img src="@/assets/images/ai_storage.jpg" alt="AI Storage" class="w-full h-40 object-cover rounded-lg">
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

    <!-- Surgery List Dialog -->
    <el-dialog
      v-model="showSurgeryList"
      title="病人及手术信息"
      width="60%"
    >
      <!-- Patient Info Section -->
      <div v-if="patientInfo" class="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 class="text-lg font-bold text-gray-800 mb-3 border-b border-blue-200 pb-2">病人基本信息</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span class="text-gray-500">姓名：</span><span class="font-medium text-gray-900">{{ patientInfo.name }}</span></div>
          <div><span class="text-gray-500">病案号：</span><span class="font-medium text-gray-900">{{ patientInfo.caseNumber }}</span></div>
          <div><span class="text-gray-500">性别：</span><span class="font-medium text-gray-900">{{ patientInfo.gender }}</span></div>
          <div><span class="text-gray-500">年龄：</span><span class="font-medium text-gray-900">{{ patientInfo.age }}岁</span></div>
          <div><span class="text-gray-500">身高：</span><span class="font-medium text-gray-900">{{ patientInfo.height }}cm</span></div>
          <div><span class="text-gray-500">体重：</span><span class="font-medium text-gray-900">{{ patientInfo.weight }}kg</span></div>
        </div>
      </div>

      <!-- Surgery List Section -->
      <div>
        <h3 class="text-lg font-bold text-gray-800 mb-3 pl-2 border-l-4 border-[#7B68EE]">手术列表</h3>
        <el-table :data="surgeryList" stripe style="width: 100%" border>
          <el-table-column prop="date" label="手术日期" width="180" />
          <el-table-column prop="surgeryName" label="手术名称" />
           <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <el-button type="primary" size="small" @click="startEvaluation(scope.row)">
                开始评估
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPatientSurgeryList } from '@/api/airway.js'
import { getAuthToken, removeAuthToken } from '@/utils/storage.js'

const router = useRouter()
const caseNumber = ref('')
const showSurgeryList = ref(false)
const surgeryList = ref([])
const patientInfo = ref(null)
const isLoggedIn = ref(false)

onMounted(() => {
    const token = getAuthToken()
    isLoggedIn.value = !!token
})

const handleLogout = () => {
    removeAuthToken()
    isLoggedIn.value = false
    ElMessage.success('已退出登录')
    router.push('/')
}

const handleNativeInput = (e) => {
  // Allow only numbers
  const val = e.target.value.replace(/\D/g, '')
  caseNumber.value = val
  if (caseNumber.value.length === 10) {
    fetchSurgeryList()
  }
}

const checkCaseNumber = () => {
    if (caseNumber.value.length === 10) {
        fetchSurgeryList()
    } else {
        ElMessage.warning('请输入10位病案号')
    }
}

const fetchSurgeryList = async () => {
  try {
    // 真实调用接口逻辑
    const res = await getPatientSurgeryList({ admissionNumber: caseNumber.value });
    console.log('API Response:', res)
    if(res.code !== 200){
        if(res.code === 10001){
            ElMessage.warning(res.msg || res.err || '未找到病人信息')
            return
        }

        if(res.code === 10006){
            ElMessage.warning(res.msg || res.err || '未找到病人信息')
            return
        }
        ElMessage.error(res?.msg || '获取信息失败')
        return
    }
    
    if (res && res.code === 200) {
      const dataList = res.data || []
      
      if (dataList.length > 0) {
        // 取第一条数据作为病人基本信息
        const info = dataList[0]
        patientInfo.value = {
          name: info.name,
          caseNumber: info.admissionNumber,
          gender: info.gender === 'MALE' ? '男' : (info.gender === 'FEMALE' ? '女' : info.gender),
          age: info.age,
          patientId: info.patientId,
          registerId: info.registerId,
          height: info.height,
          weight: info.weight,
          pastMedicalHistory: info.pastMedicalHistory
        }

        // 映射手术列表
        surgeryList.value = dataList.map(item => ({
          date: item.surgeryDate ? item.surgeryDate.replace('T', ' ').substring(0, 16) : '',
          surgeryName: item.surgeryName,
          ...item // 保留原始数据
        }))
        
        showSurgeryList.value = true
      } else {
        ElMessage.warning('未找到该病人的手术信息')
        surgeryList.value = []
        patientInfo.value = null
      }
    } else if (res && res.code === 10006) {
      ElMessage.warning(res.msg || res.err || '未找到病人信息')
      surgeryList.value = []
    } else {
      ElMessage.error(res?.msg || '获取信息失败')
    }
  } catch (error) {
    console.error('Error fetching patient info:', error)
    ElMessage.error('获取病人信息失败')
  }
}

const startEvaluation = (row) => {
    // Navigate to evaluation page, possibly passing patient info
    console.log('Starting evaluation for:', row)
    // 可以通过 query 传递一些参数
    router.push({
      path: '/airway-evaluation',
      query: {
        // caseNumber: patientInfo.value.caseNumber,
        // surgeryName: row.name,
        // 传递完整病人信息
        patientData: JSON.stringify(patientInfo.value)
      }
    })
}
</script>
