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
                        <el-button type="primary" color="#2563EB" class="px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap" @click="isEditing = true">
                            <i class="fas fa-edit mr-2"></i> 修改信息
                        </el-button>
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
                    <el-button v-else type="success" class="px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap" @click="comfirmSavePatientInfo">
                        <i class="fas fa-save mr-2"></i> 确认保存
                    </el-button>
                </div>
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
import { ref, defineComponent, h, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { savePatientInfo, startPatientPredict, getAirwayPatientById, pushMediaInfo, getPatientMediaInfo } from '@/api/airway.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute();
const isEditing = ref(false);
const isSaved = ref(false); // Track if patient info is already saved in the system
const airwayPatientId = ref(null); // The database ID of the airway patient record

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

onMounted(() => {
  if (route.query.patientData) {
    try {
      const data = JSON.parse(route.query.patientData);
      patientInfo.value = { ...patientInfo.value, ...data };
      
      // Check if patient info exists in the system
      if (patientInfo.value.patientId) {
        // 1. Check patient existence and get ID
        getAirwayPatientById(patientInfo.value.patientId).then(res => {
          if (res && res.code === 200 && res.data) {
            isSaved.value = true;
            airwayPatientId.value = res.data.id;
            
            // 2. Fetch existing media info using the database ID
            getPatientMediaInfo(airwayPatientId.value).then(mediaRes => {
                 if (mediaRes && mediaRes.code === 200 && mediaRes.data) {
                     const mediaList = mediaRes.data;
                     // Map backend media types to frontend keys
                     const typeMap = {
                         'PHYSICAL_EXAMINATION_1': 'appearanceFront',
                         'PHYSICAL_EXAMINATION_2': 'appearanceSide',
                         'THYROMENTAL_NECK_1': 'neckSideUp',
                         'THYROMENTAL_NECK_2': 'neckFrontUp',
                         'MOUTH_OPENING': 'mouthOpening',
                         'MALLAMPATI_SCORE': 'mallampati',
                         'DENTAL_EXAMINATION': 'teeth',
                         'UPPER_LIP_BITE_TEST': 'upperLip',
                         'NECK_FLEXION_EXTENSION_1': 'videoFlexion',
                         'NECK_FLEXION_EXTENSION_2': 'videoGeneral'
                     };
                     
                     mediaList.forEach(item => {
                         const key = typeMap[item.type];
                         if (key && item.url) {
                             files.value[key] = item.url; 
                         }
                     });
                 }
            }).catch(err => {
                console.error('Fetch media info failed', err);
            });

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
    // 1. Show preview immediately
    const url = URL.createObjectURL(file);
    files.value[key] = url;

    // 2. Upload to backend
    if (!isSaved.value || !patientInfo.value.patientId) {
        ElMessage.warning('请先保存病人基本信息后再上传影像');
        return;
    }

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

    pushMediaInfo(formData).then(res => {
        if(res && res.code === 200) {
            ElMessage.success('上传成功');
        } else {
            ElMessage.error(res?.message || '上传失败');
        }
    }).catch(err => {
        console.error('Upload failed', err);
        ElMessage.error('上传请求异常');
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
             getAirwayPatientById(patientInfo.value.patientId).then(r => {
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