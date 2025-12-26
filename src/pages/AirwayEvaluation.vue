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
      <div @click="router.push('/')" class="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
        <i class="fas fa-home text-xl"></i>
        <span class="font-sans text-sm whitespace-nowrap">返回首页 Back to Home</span>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-7xl mx-auto px-6 pb-8 z-10 flex-1 flex flex-col overflow-hidden h-full">
        
        <!-- Patient Info Card -->
        <div class="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-sm border border-blue-50 p-6 mb-6">
            <div class="flex justify-between items-start">
                <div class="flex flex-col gap-4 w-full">
                    <div class="flex items-center gap-4 text-gray-700 flex-wrap">
                        <h2 class="text-xl font-bold text-blue-900 flex items-center gap-2 mr-4">
                            <i class="fas fa-user-circle"></i> 病人基本信息
                        </h2>
                        
                         <!-- Case Number (Always Read Only or Display) -->
                         <div class="flex items-center gap-2">
                            <span class="text-blue-800 font-medium whitespace-nowrap">病案号:</span>
                             <span v-if="!isEditing" class="font-bold text-blue-900">{{ patientInfo.caseNumber || patientInfo.admissionNumber }}</span>
                            <el-input v-else v-model="patientInfo.caseNumber" disabled size="default" style="width: 120px;" />
                        </div>

                        <!-- View Mode -->
                        <template v-if="!isEditing">
                            <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">姓名: <b class="text-blue-900">{{ patientInfo.name }}</b></span>
                            <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">性别: <b class="text-blue-900">{{ patientInfo.gender === 'MALE' ? '男' : (patientInfo.gender === 'FEMALE' ? '女' : patientInfo.gender) }}</b></span>
                            <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">年龄: <b class="text-blue-900">{{ patientInfo.age }}</b></span>
                            <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">身高: <b class="text-blue-900">{{ patientInfo.height }}cm</b></span>
                            <span class="bg-blue-50 px-3 py-1 rounded-md text-blue-800">体重: <b class="text-blue-900">{{ patientInfo.weight }}kg</b></span>
                        </template>

                        <!-- Edit Mode -->
                        <template v-else>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-800 font-medium whitespace-nowrap">姓名:</span>
                                <el-input v-model="patientInfo.name" size="default" style="width: 100px;" />
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-800 font-medium whitespace-nowrap">性别:</span>
                                <el-select v-model="patientInfo.gender" size="default" style="width: 80px;">
                                    <el-option label="男" value="MALE" />
                                    <el-option label="女" value="FEMALE" />
                                </el-select>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-800 font-medium whitespace-nowrap">年龄:</span>
                                <el-input v-model="patientInfo.age" size="default" type="number" style="width: 80px;" />
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-800 font-medium whitespace-nowrap">身高(cm):</span>
                                <el-input v-model="patientInfo.height" size="default" type="number" style="width: 80px;" />
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-800 font-medium whitespace-nowrap">体重(kg):</span>
                                <el-input v-model="patientInfo.weight" size="default" type="number" style="width: 80px;" />
                            </div>
                        </template>
                    </div>
                    <div class="flex items-start gap-2 w-full pr-4">
                        <span class="font-bold text-blue-900 whitespace-nowrap mt-1">既往史:</span>
                        <div v-if="!isEditing" class="text-gray-600 mt-1">{{ patientInfo.pastMedicalHistory }}</div>
                        <el-input 
                            v-else
                            v-model="patientInfo.pastMedicalHistory" 
                            type="textarea" 
                            :rows="2" 
                            placeholder="请输入既往史" 
                            class="flex-1"
                        />
                    </div>
                </div>
                <div class="flex flex-col justify-center h-full pt-2 gap-2">
                    <template v-if="!isEditing">
                        <el-tooltip content="该病人信息已保存" placement="top" :disabled="!isSaved">
                            <div class="inline-block">
                                <el-button 
                                    type="primary" 
                                    color="#2563EB" 
                                    class="px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap" 
                                    :disabled="isSaved" 
                                    @click="isEditing = true"
                                >
                                    <i class="fas fa-edit mr-2"></i> 修改信息
                                </el-button>
                            </div>
                        </el-tooltip>
                         <el-tooltip content="该病人信息已保存" placement="top" :disabled="!isSaved">
                            <div class="inline-block">
                                <el-button 
                                    type="success" 
                                    class="px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap" 
                                    :disabled="isSaved"
                                    @click="comfirmSavePatientInfo"
                                >
                                    <i class="fas fa-save mr-2"></i> 保存
                                </el-button>
                            </div>
                        </el-tooltip>
                    </template>
                    <el-button v-else type="primary" plain class="px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap" @click="isEditing = false">
                        <i class="fas fa-check mr-2"></i> 完成修改
                    </el-button>
                </div>
            </div>
        </div>

        <!-- Evaluation Form Card -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex-1 overflow-y-auto custom-scrollbar relative">
             
             <!-- Result Overlay -->
             <div v-if="evaluationResult" class="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                <div class="text-center p-8 rounded-2xl bg-white shadow-2xl border border-blue-100 max-w-md w-full">
                    <div class="mb-6">
                        <div class="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                             <i class="fas fa-clipboard-check text-4xl text-blue-600"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">评估结果</h2>
                        <p class="text-gray-500 text-sm">Evaluation Result</p>
                    </div>
                    
                    <div class="space-y-6 mb-8">
                        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span class="text-gray-600 font-medium">是否困难气道</span>
                            <span :class="['text-xl font-bold px-3 py-1 rounded-lg', evaluationResult.prediction ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600']">
                                {{ evaluationResult.prediction ? '是 (Yes)' : '否 (No)' }}
                            </span>
                        </div>
                         <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span class="text-gray-600 font-medium">预测概率</span>
                            <span class="text-xl font-bold text-blue-600">
                                {{ (evaluationResult.probability * 100).toFixed(2) }}%
                            </span>
                        </div>
                    </div>

                    <el-button type="primary" size="large" class="w-full" @click="router.push('/')">
                        <i class="fas fa-home mr-2"></i> 回到首页
                    </el-button>
                </div>
             </div>

             <!-- Loading Overlay -->
             <div v-if="isEvaluating" class="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                <h3 class="text-xl font-bold text-blue-900 mb-2">正在智能评估中...</h3>
                <p class="text-gray-500">请耐心等待，这可能需要几分钟时间</p>
                <p class="text-red-500 font-bold mt-2 animate-pulse">请勿刷新页面，以免中断评估</p>
             </div>

             <!-- Completed State -->
             <div v-if="patientInfo.state === 'EVALUATED'" class="h-full flex flex-col items-center justify-center text-center p-10 animate-fade-in">
                <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <i class="fas fa-check-circle text-5xl text-green-500"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">评估已完成</h2>
                <p class="text-gray-500 mb-8 max-w-md">评估已完成，在评估结果列表页面可以查看评估详情。</p>
                <el-button type="primary" size="large" class="px-8" @click="router.push('/')">
                    <i class="fas fa-home mr-2"></i> 返回首页
                </el-button>
             </div>

             <!-- Upload Form -->
             <div v-else>
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
                    <span class="text-white font-medium">前屈</span>
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
                     <!-- <span class="absolute -top-8 left-0 w-full text-center text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded-md">
                        <i class="fas fa-exclamation-circle mr-1"></i>该部分是视频
                     </span> -->
                      <div class="h-10 flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                        <i class="fas fa-video text-white"></i>
                        <span class="text-white font-medium">后仰</span>
                      </div>
                     <UploadBox v-model="files.videoGeneral" id="videoGeneral" type="video" @change="(e) => handleFileChange(e, 'videoGeneral')" />
                   </div>
                </div>
             </div>

                 <!-- Bottom Action Button -->
                 <div class="flex justify-end mt-12 pt-6 border-t border-gray-100">
                   <el-tooltip :content="canStartEvaluation ? '开始智能评估' : '请先上传所有必要的影像资料'" placement="top">
                       <div class="inline-block">
                            <el-button 
                                type="primary" 
                                color="#2563EB" 
                                class="px-12 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
                                size="large" 
                                :disabled="!canStartEvaluation"
                                @click="sendStartPredictMsg"
                            >
                                <i class="fas fa-robot mr-3"></i> 开始智能评估
                            </el-button>
                       </div>
                   </el-tooltip>
                 </div>
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
import { ref, defineComponent, h, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { savePatientInfo, startPatientPredict, getPatientById, pushMediaInfo, getPatientMediaInfo, getPhotoFileByPath } from '@/api/airway.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);
const isSaved = ref(false); // Track if patient info is already saved in the system
const airwayPatientId = ref(null); // The database ID of the airway patient record
const evaluationResult = ref(null); // Store prediction result
const isEvaluating = ref(false); // Track evaluation loading state

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
    patientId: '',
    admissionNumber: '',
    registerId: '',
    name: '',
    gender: 'MALE', // Assuming Enum MALE/FEMALE
    age: 0,
    height: 0,
    weight: 0,
    pastMedicalHistory: '',
    state: 'NOT_EVALUATED',
    difficultAirway: false,
    prob: 0.0
});

const refreshMediaInfo = () => {
    if (!airwayPatientId.value) return;

    getPatientMediaInfo(airwayPatientId.value).then(mediaRes => {
         if (mediaRes && mediaRes.code === 200 && mediaRes.data) {
             const info = mediaRes.data;
             
             const loadPreview = (key, path) => {
                 if (!path) {
                    // If backend has no path, ensure frontend is cleared
                    if (files.value[key]) {
                        URL.revokeObjectURL(files.value[key]);
                    }
                    files.value[key] = null;
                    return;
                 }
                 
                 getPhotoFileByPath(path).then(blob => {
                     if (blob && blob.size > 0) {
                         if (files.value[key]) {
                            URL.revokeObjectURL(files.value[key]);
                         }
                         files.value[key] = URL.createObjectURL(blob);
                     }
                 }).catch(e => console.error(`Failed to load ${key}`, e));
             };

             loadPreview('appearanceFront', info.physicalExamination1);
             loadPreview('appearanceSide', info.physicalExamination2);
             loadPreview('neckSideUp', info.thyromentalNeck1);
             loadPreview('neckFrontUp', info.thyromentalNeck2);
             loadPreview('mouthOpening', info.mouthOpening);
             loadPreview('mallampati', info.mallampatiScore);
             loadPreview('teeth', info.dentalExamination);
             loadPreview('upperLip', info.upperLipBiteTest);
             loadPreview('videoFlexion', info.neckFlexionExtension1);
             loadPreview('videoGeneral', info.neckFlexionExtension2);
         }
    }).catch(err => {
        console.error('Fetch media info failed', err);
    });
}

const pollInterval = ref(null);

const startPolling = () => {
    if (pollInterval.value) clearInterval(pollInterval.value);
    
    pollInterval.value = setInterval(() => {
        if (!patientInfo.value.patientId) return;
        
        getPatientById(patientInfo.value.patientId).then(res => {
            if (res && res.code === 200 && res.data) {
                // Update state
                if (res.data.state && res.data.state !== patientInfo.value.state) {
                    patientInfo.value.state = res.data.state;
                }

                if (res.data.state === 'EVALUATED') {
                    clearInterval(pollInterval.value);
                    pollInterval.value = null;
                    isEvaluating.value = false;
                    evaluationResult.value = {
                        prediction: res.data.difficultAirway,
                        probability: res.data.prob
                    };
                    ElMessage.success('评估完成');
                } else if (res.data.state !== 'EVALUATING' && res.data.state !== 'EVALUATEING') {
                    // Stopped for other reasons (e.g. FAILED)
                    clearInterval(pollInterval.value);
                    pollInterval.value = null;
                    isEvaluating.value = false;
                }
            }
        }).catch(err => console.error(err));
    }, 3000);
}

onUnmounted(() => {
    if (pollInterval.value) clearInterval(pollInterval.value);
});

onMounted(() => {
  if (route.query.patientData) {
    try {
      const data = JSON.parse(route.query.patientData);
      patientInfo.value = { ...patientInfo.value, ...data };
      
      // Check if patient info exists in the system
      if (patientInfo.value.patientId) {
        // 1. Check patient existence and get ID
        getPatientById(patientInfo.value.patientId).then(res => {
          if (res && res.code === 200 && res.data) {
            isSaved.value = true;
            airwayPatientId.value = res.data.id;
            
            // Update state from backend to ensure correct UI display
            if (res.data.state) {
                patientInfo.value.state = res.data.state;
            }

            // Restore evaluating state
            if (res.data.state === 'EVALUATING' || res.data.state === 'EVALUATEING') {
                isEvaluating.value = true;
                startPolling();
            }

            // 2. Fetch existing media info using the database ID
            refreshMediaInfo();

          } else {
            isSaved.value = false;
            airwayPatientId.value = null;
          }
        }).catch(err => {
          console.error('Check patient existence failed', err);
        });
      }
    } catch (e) {
      console.error('Failed to parse patient data', e);
    }
  }
});

const handleFileChange = (event, key) => {
  const file = event.target.files[0];
  if (file) {
    // 1. Validate preconditions
    if (!isSaved.value || !patientInfo.value.patientId) {
        ElMessage.warning('请先保存病人基本信息后再上传影像');
        event.target.value = ''; // Reset input value
        return;
    }

    // 2. Upload to backend
    const formData = new FormData();
    formData.append('airwaypatientId', airwayPatientId.value);
    formData.append('file', file);
    
    // Map frontend key to backend enum type
    const reverseTypeMap = {
        'appearanceFront': 'PHYSICAL_EXAMINATION_1',
        'appearanceSide': 'PHYSICAL_EXAMINATION_2',
        'neckSideUp': 'THYROMENTAL_NECK_1',
        'neckFrontUp': 'THYROMENTAL_NECK_2',
        'mouthOpening': 'MOUTH_OPENING',
        'mallampati': 'MALLAMPATI_SCORE',
        'teeth': 'DENTAL_EXAMINATION',
        'upperLip': 'UPPER_LIP_BITE_TEST',
        'videoFlexion': 'NECK_FLEXION_EXTENSION_1',
        'videoGeneral': 'NECK_FLEXION_EXTENSION_2'
    };
    formData.append('type', reverseTypeMap[key]);

    console.log("开始调用上传接口")
    pushMediaInfo(formData).then(res => {
        if(res && res.code === 200) {
            ElMessage.success('上传成功');
            // 3. Refresh media info from backend to display the uploaded image
            refreshMediaInfo();
        } else {
            ElMessage.error(res?.message || '上传失败');
        }
    }).catch(err => {
        console.error('Upload failed', err);
        ElMessage.error('上传请求异常');
    }).finally(() => {
        event.target.value = ''; // Reset input value regardless of success/failure
    });
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
  ElMessageBox.confirm(
    '是否确定修改病人信息？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      customClass: 'custom-blue-message-box'
    }
  )
    .then(() => {
      // Map frontend patientInfo to backend AirwayPatient structure
      const genderMap = {
        '男': 'MALE',
        '女': 'FEMALE',
        'MALE': 'MALE',
        'FEMALE': 'FEMALE'
      };

      const payload = {
        patientId: patientInfo.value.patientId,
        admissionNumber: patientInfo.value.caseNumber || patientInfo.value.admissionNumber, // Handle caseNumber/admissionNumber alias
        registerId: patientInfo.value.registerId,
        age: Number(patientInfo.value.age),
        gender: genderMap[patientInfo.value.gender] || patientInfo.value.gender, // Ensure gender is Enum string
        height: parseFloat(patientInfo.value.height),
        weight: parseFloat(patientInfo.value.weight),
        pastMedicalHistory: patientInfo.value.pastMedicalHistory,
        name: patientInfo.value.name,
        state: patientInfo.value.state || 'NOT_EVALUATED',
        difficultAirway: patientInfo.value.difficultAirway || false,
        prob: patientInfo.value.prob || 0.0
      };

      console.log('保存病人信息:', payload);
      savePatientInfo(payload).then(res => {
        if (res && res.code === 200) {
          ElMessage.success('保存成功')
          isEditing.value = false; // Exit edit mode
          isSaved.value = true; // Mark as saved
          
          // If the response contains the ID, use it. Otherwise fetch it.
          if (res.data && res.data.id) {
             airwayPatientId.value = res.data.id;
          } else {
             // Fallback: fetch by patientId
             getPatientById(patientInfo.value.patientId).then(r => {
                 if (r && r.code === 200 && r.data) {
                     airwayPatientId.value = r.data.id;
                 }
             });
          }
        } else {
          ElMessage.error(res?.message || '保存失败')
        }
      }).catch(err => {
          console.error(err)
          ElMessage.error('保存请求异常')
      })
    })
    .catch(() => {
      // Cancelled
    })
}

const canStartEvaluation = computed(() => {
    // Check if airwayPatientId exists
    if (!airwayPatientId.value) return false;

    // Check if all files in the files object are not null
    const allFilesUploaded = Object.values(files.value).every(file => file !== null && file !== '');
    return allFilesUploaded;
});

const sendStartPredictMsg = () => {
  if (!canStartEvaluation.value) {
      ElMessage.warning('请确保所有影像资料都已上传');
      return;
  }

  // 这里添加发送开始评估消息的逻辑
  console.log('发送开始评估消息:', airwayPatientId.value);
  isEvaluating.value = true;
  startPatientPredict(airwayPatientId.value).then(res => {
    if (res && res.code === 200 && res.data) {
        evaluationResult.value = {
            prediction: res.data.prediction,
            probability: res.data.probability
        };
        ElMessage.success('评估完成');
    } else if (res && res.code >= 10001 && res.code <= 10006) {
        ElMessage.error(res.err || res.message || '评估失败');
    } else {
        ElMessage.error(res?.message || '评估开始失败');
    }
  }).catch(err => {
      console.error(err);
      ElMessage.error('请求异常');
  }).finally(() => {
      isEvaluating.value = false;
  })
}
</script>

<style>
/* Global styles for custom message box */
.custom-blue-message-box {
  border-radius: 12px !important;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
}

.custom-blue-message-box .el-message-box__header {
  padding: 15px 20px !important;
  border-bottom: 2px solid #ebf5ff;
  background-color: #fff;
}

.custom-blue-message-box .el-message-box__title {
  display: flex;
  justify-content: center;
  color: #1e3a8a !important; /* blue-900 */
  font-weight: bold !important;
  font-size: 1.125rem !important;
}

.custom-blue-message-box .el-message-box__status.el-message-box-icon--warning {
  color: #2563EB !important; /* blue-600 */
}

.custom-blue-message-box .el-message-box__content {
  padding: 30px 20px !important;
  color: #4b5563 !important; /* gray-600 */
  font-size: 1rem !important;
  text-align: center !important;
}

.custom-blue-message-box .el-message-box__btns {
  padding: 10px 20px 20px !important;
  justify-content: center !important;
  gap: 12px;
}

.custom-blue-message-box .el-button--primary {
  background-color: #2563EB !important;
  border-color: #2563EB !important;
  padding: 8px 24px !important;
}

.custom-blue-message-box .el-button--primary:hover {
  background-color: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}
</style>

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