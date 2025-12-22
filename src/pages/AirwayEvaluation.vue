<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 flex flex-col items-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <img src="@/assets/images/index_bg.jpg" alt="Medical Tech Background" class="w-full h-full object-cover opacity-10">
    </div>

    <!-- Header Section -->
    <header class="w-full py-6 px-8 flex justify-between items-center z-10">
      <div class="flex items-center gap-3">
         <div class="text-2xl font-bold text-blue-900 tracking-wide">
            气道评估系统 <span class="text-sm font-light text-gray-600 ml-2">Airway Assessment System</span>
         </div>
      </div>
      <!-- Optional: Add user profile or logout here if needed -->
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-7xl mx-auto px-6 pb-8 z-10 flex-1 flex flex-col overflow-hidden h-full">
        
        <!-- Patient Info Card -->
        <div class="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-sm border border-blue-50 p-6 mb-6">
            <div class="flex justify-between items-start">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-8 text-gray-700">
                        <h2 class="text-xl font-bold text-blue-900 flex items-center gap-2">
                            <i class="fas fa-user-circle"></i> 病人基本信息
                        </h2>
                        <div class="flex gap-6 text-base items-center">
                             <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">姓名: <b class="text-blue-900">张三</b></span>
                             <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">性别: <b class="text-blue-900">男</b></span>
                             <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">年龄: <b class="text-blue-900">45</b></span>
                             <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">身高: <b class="text-blue-900">175cm</b></span>
                             <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">体重: <b class="text-blue-900">70kg</b></span>
                        </div>
                    </div>
                    <div class="text-base text-gray-600 mt-2 ml-1">
                        <span class="font-bold text-blue-900">既往史:</span> 高血压，糖尿病
                    </div>
                </div>
                <el-button type="primary" color="#2563EB" class="px-8 shadow-md hover:shadow-lg transition-all" @click="comfirmSavePatientInfo">
                    <i class="fas fa-save mr-2"></i> 确认保存
                </el-button>
            </div>
        </div>

        <!-- Evaluation Form Card -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex-1 overflow-y-auto custom-scrollbar">
             
             <!-- Row 1 -->
             <div class="flex gap-8 mb-10">
                <!-- Appearance (2 images) -->
                <div class="flex-2 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-camera text-white"></i>
                    <span class="text-white font-medium">外观检查</span>
                  </div>
                  <div class="flex gap-4">
                    <UploadBox v-model="files.appearanceFront" id="appearanceFront" label="正面" @change="(e) => handleFileChange(e, 'appearanceFront')" />
                    <UploadBox v-model="files.appearanceSide" id="appearanceSide" label="侧面" @change="(e) => handleFileChange(e, 'appearanceSide')" />
                  </div>
                </div>

                <!-- Neck (2 images) -->
                <div class="flex-2 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-ruler-vertical text-white"></i>
                    <span class="text-white font-medium">颈围、甲颏距离和胸颏距离</span>
                  </div>
                  <div class="flex gap-4">
                     <UploadBox v-model="files.neckSideUp" id="neckSideUp" label="侧面仰头" @change="(e) => handleFileChange(e, 'neckSideUp')" />
                     <UploadBox v-model="files.neckFrontUp" id="neckFrontUp" label="正面仰头" @change="(e) => handleFileChange(e, 'neckFrontUp')" />
                  </div>
                </div>

                <!-- Flexion Video (1 video) -->
                <div class="flex-1 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-video text-white"></i>
                    <span class="text-white font-medium">前屈和后仰</span>
                  </div>
                  <div class="flex gap-4 h-full">
                    <UploadBox v-model="files.videoFlexion" id="videoFlexion" type="video" label="视频" @change="(e) => handleFileChange(e, 'videoFlexion')" />
                  </div>
                </div>
             </div>

             <!-- Row 2 -->
             <div class="flex gap-6">
                <!-- Mouth -->
                <div class="flex-1 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-2 shadow-sm">
                    <i class="fas fa-tooth text-white"></i>
                    <span class="text-white font-medium text-sm">张口度</span>
                  </div>
                  <UploadBox v-model="files.mouthOpening" id="mouthOpening" @change="(e) => handleFileChange(e, 'mouthOpening')" />
                </div>

                <!-- Mallampati -->
                <div class="flex-1 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-2 shadow-sm">
                    <i class="fas fa-list-ol text-white"></i>
                    <span class="text-white font-medium text-sm">Mallampati分级</span>
                  </div>
                   <UploadBox v-model="files.mallampati" id="mallampati" @change="(e) => handleFileChange(e, 'mallampati')" />
                </div>

                <!-- Teeth -->
                <div class="flex-1 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-2 shadow-sm">
                    <i class="fas fa-teeth text-white"></i>
                    <span class="text-white font-medium text-sm">牙齿检查</span>
                  </div>
                   <UploadBox v-model="files.teeth" id="teeth" @change="(e) => handleFileChange(e, 'teeth')" />
                </div>

                <!-- Upper Lip -->
                <div class="flex-1 flex flex-col">
                  <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-2 shadow-sm">
                    <i class="fas fa-smile text-white"></i>
                    <span class="text-white font-medium text-sm">上唇咬合试验</span>
                  </div>
                   <UploadBox v-model="files.upperLip" id="upperLip" @change="(e) => handleFileChange(e, 'upperLip')" />
                </div>

                <!-- General Video -->
                <div class="flex-1 flex flex-col pt-14">
                   <!-- No header, just the video box aligned with others, maybe slightly different -->
                   <div class="relative h-full">
                     <span class="absolute -top-8 left-0 w-full text-center text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded-md">
                        <i class="fas fa-exclamation-circle mr-1"></i>该部分是视频
                     </span>
                     <UploadBox v-model="files.videoGeneral" id="videoGeneral" type="video" @change="(e) => handleFileChange(e, 'videoGeneral')" />
                   </div>
                </div>
             </div>

             <!-- Bottom Action Button -->
             <div class="flex justify-end mt-12 pt-6 border-t border-gray-100">
               <el-button type="primary" color="#2563EB" class="px-12 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" size="large" @click="sendStartPredictMsg">
                 <i class="fas fa-robot mr-3"></i> 开始智能评估
               </el-button>
             </div>

        </div>

    </main>

    <!-- Footer -->
    <footer class="w-full py-6 text-center text-gray-500 text-sm z-10 bg-white bg-opacity-60 backdrop-blur-sm">
      © 2025 Airway Assessment System. All rights reserved.
    </footer>

  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue';
import { savePatientInfo, startPatientPredict } from '@/api/airway.js'
import { ElMessage } from 'element-plus'

const files = ref({
  appearanceFront: null,
  appearanceSide: null,
  neckSideUp: null,
  neckFrontUp: null,
  mouthOpening: null,
  mallampati: null,
  teeth: null,
  upperLip: null,
  videoFlexion: null,
  videoGeneral: null
});

// Mock Data for Patient Info (matching the template display)
const patientInfo = ref({
    name: '张三',
    caseNumber: '1234567890', // Assume caseNumber is available
    gender: '男',
    age: 45,
    height: 175,
    weight: 70
});

const handleFileChange = (event, key) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    files.value[key] = url;
  }
};

// Reusable Upload Component (Updated Styles for Blue Theme)
const UploadBox = defineComponent({
  props: ['modelValue', 'id', 'label', 'type'],
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const trigger = () => {
      document.getElementById(`fileInput_${props.id}`).click();
    }
    
    return () => h('div', {
      class: 'flex-1 bg-gray-50 rounded-lg overflow-hidden relative aspect-[3/4] cursor-pointer group hover:bg-white transition-all duration-300 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 hover:shadow-md',
      onClick: trigger
    }, [
      props.modelValue 
        ? (props.type === 'video' 
            ? h('video', { src: props.modelValue, class: 'w-full h-full object-cover', controls: true }) 
            : h('img', { src: props.modelValue, class: 'w-full h-full object-cover' }))
        : h('div', { class: 'flex flex-col items-center text-gray-400 group-hover:text-blue-500 transition-colors' }, [
            h('div', { class: 'relative' }, [
              h('i', { class: `fas fa-${props.type === 'video' ? 'video' : 'image'} text-[2rem]` }),
              h('i', { class: 'fas fa-plus absolute -top-1 -right-3 text-[1rem]' })
            ]),
            props.label ? h('span', { class: 'mt-2 text-xs font-medium' }, props.label) : null
          ]),
      h('input', {
        type: 'file',
        id: `fileInput_${props.id}`,
        class: 'hidden',
        accept: props.type === 'video' ? 'video/*' : 'image/*',
        onChange: (e) => emit('change', e)
      })
    ])
  }
})

const comfirmSavePatientInfo = () => {
  // 这里添加保存病人信息的逻辑
  console.log('保存病人信息:', patientInfo.value);
  savePatientInfo(patientInfo.value).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败')
    }
  })
}

const sendStartPredictMsg = () => {
  // 这里添加发送开始评估消息的逻辑
  console.log('发送开始评估消息:', patientInfo.value);
  startPatientPredict({
    caseNumber: patientInfo.value.caseNumber
  }).then(res => {
    if (res.code === 200) {
      ElMessage.success('评估开始')
    } else {
      ElMessage.error('评估开始失败')
    }
  })
}
</script>

<style scoped>
.flex-2 {
  flex: 2;
}

/* Custom Scrollbar for the main content area */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>