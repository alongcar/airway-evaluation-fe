<template>
  <div class="flex h-screen w-full bg-gray-100 overflow-hidden font-sans">
    <!-- Left Sidebar -->
    <aside class="w-80 flex flex-col bg-blue-900 border-r border-blue-800 shadow-xl z-20 flex-shrink-0">
       <!-- Header -->
       <div class="p-5 bg-blue-950/50 border-b border-blue-800">
          <div class="flex items-center justify-between mb-4">
             <h2 class="text-xl font-bold text-white tracking-wide flex items-center">
                <i class="fas fa-history mr-2 text-blue-300"></i> 评估记录
             </h2>
             <el-button link class="!text-blue-300 hover:!text-white" @click="router.push('/')">
                <i class="fas fa-home"></i>
             </el-button>
          </div>
          
          <!-- Filters -->
          <div class="space-y-3">
              <el-date-picker
                 v-model="dateRange"
                 type="daterange"
                 range-separator="-"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 size="default"
                 format="YYYY-MM-DD"
                 value-format="YYYY-MM-DD"
                 style="width: 100%"
                 @change="handleFilter"
              />
              <el-input
                 v-model="searchKeyword"
                 placeholder="搜索姓名/病案号"
                 prefix-icon="Search"
                 clearable
                 size="default"
                 @input="handleFilter"
              />
              
              <!-- Difficulty Filter Buttons -->
              <div class="flex gap-2 pt-1">
                  <button 
                    @click="toggleDifficultyFilter(true)"
                    :class="['flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 border',
                      difficultAirwayFilter === true 
                        ? 'bg-red-500 text-white border-red-500 shadow-md transform scale-105' 
                        : 'bg-blue-900/30 text-red-200 border-red-500/20 hover:bg-red-500/10']"
                  >
                    <i class="fas fa-exclamation-triangle mr-1"></i> 困难
                  </button>
                  <button 
                    @click="toggleDifficultyFilter(false)"
                    :class="['flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 border',
                      difficultAirwayFilter === false 
                        ? 'bg-green-500 text-white border-green-500 shadow-md transform scale-105' 
                        : 'bg-blue-900/30 text-green-200 border-green-500/20 hover:bg-green-500/10']"
                  >
                    <i class="fas fa-check-circle mr-1"></i> 正常
                  </button>
              </div>
          </div>
       </div>

       <!-- List -->
       <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          <div 
             v-for="item in filteredList" 
             :key="item.id"
             @click="selectItem(item)"
             :class="['p-4 rounded-xl cursor-pointer transition-all duration-200 border relative overflow-hidden group', 
                      currentItem?.id === item.id 
                      ? 'bg-blue-600 border-blue-500 shadow-lg translate-x-1' 
                      : 'bg-blue-800/40 border-blue-700/50 text-blue-100 hover:bg-blue-800 hover:border-blue-600']"
          >
             <!-- Active Indicator -->
             <div v-if="currentItem?.id === item.id" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-300"></div>

             <div class="flex justify-between items-start mb-2 pl-2">
                <span :class="['font-bold text-lg', currentItem?.id === item.id ? 'text-white' : 'text-blue-50']">{{ item.name }}</span>
                <span :class="['text-xs px-2 py-0.5 rounded-full font-medium border', 
                   item.difficultAirway 
                   ? 'bg-red-500/20 text-red-200 border-red-500/30' 
                   : 'bg-green-500/20 text-green-200 border-green-500/30']">
                   {{ item.difficultAirway ? `困难 ${item.prob ? (item.prob * 100).toFixed(0) + '%' : ''}` : '正常' }}
                </span>
             </div>
             <div class="flex flex-col gap-1 text-xs opacity-80 pl-2">
                <span class="flex items-center gap-2">
                   <i class="fas fa-id-card w-3 opacity-70"></i> {{ item.admissionNumber || item.caseNumber }}
                </span>
                <span class="flex items-center gap-2">
                   <i class="fas fa-clock w-3 opacity-70"></i> {{ formatDate(item.createTime) }}
                </span>
             </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredList.length === 0" class="flex flex-col items-center justify-center py-10 text-blue-300/50">
             <i class="fas fa-inbox text-4xl mb-2"></i>
             <span class="text-sm">暂无记录</span>
          </div>
       </div>
    </aside>

    <!-- Right Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
       <!-- Placeholder -->
       <div v-if="!currentItem" class="flex flex-col items-center justify-center h-full text-gray-400 bg-white/50">
          <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
             <i class="fas fa-clipboard-list text-6xl text-gray-300"></i>
          </div>
          <p class="text-xl font-medium text-gray-500">请从左侧选择一条评估记录查看详情</p>
       </div>
       
       <!-- Detail View -->
       <div v-else class="flex-1 overflow-y-auto custom-scrollbar p-8">
            <!-- Header with Title -->
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-blue-900 flex items-center gap-3">
                        <span class="w-2 h-8 bg-blue-600 rounded-full block"></span>
                        评估详情
                    </h1>
                    <p class="text-gray-500 mt-1 ml-5">Evaluation Details - {{ formatDate(currentItem.createTime) }}</p>
                </div>
                
                <!-- Result Badge -->
                <div :class="['px-6 py-3 rounded-xl border flex items-center gap-3 shadow-sm', 
                    currentItem.difficultAirway ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100']">
                    <div :class="['w-3 h-3 rounded-full animate-pulse', currentItem.difficultAirway ? 'bg-red-500' : 'bg-green-500']"></div>
                    <div>
                        <span class="block text-xs text-gray-500 font-medium uppercase tracking-wider">评估结果</span>
                        <div class="flex flex-col">
                            <span :class="['text-lg font-bold', currentItem.difficultAirway ? 'text-red-600' : 'text-green-600']">
                                {{ currentItem.difficultAirway ? '困难气道 (Difficult)' : '正常气道 (Normal)' }}
                            </span>
                            <span v-if="currentItem.difficultAirway && currentItem.prob" class="text-sm font-bold text-red-600">
                                概率: {{ (currentItem.prob * 100).toFixed(2) }}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Patient Info Card -->
            <div class="bg-white rounded-xl shadow-sm border border-blue-50 p-6 mb-8">
                <h3 class="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <i class="fas fa-user-circle text-blue-600"></i> 病人基本信息
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InfoItem label="病案号" :value="patientInfo.caseNumber || patientInfo.admissionNumber" />
                    <InfoItem label="姓名" :value="patientInfo.name" />
                    <InfoItem label="性别" :value="formatGender(patientInfo.gender)" />
                    <InfoItem label="年龄" :value="patientInfo.age" unit="岁" />
                    <InfoItem label="身高" :value="patientInfo.height" unit="cm" />
                    <InfoItem label="体重" :value="patientInfo.weight" unit="kg" />
                    <InfoItem label="既往史" :value="patientInfo.pastMedicalHistory" class="md:col-span-2" />
                </div>
            </div>

            <!-- Media Content -->
            <div class="bg-white rounded-xl shadow-sm border border-blue-50 p-6">
                 <h3 class="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <i class="fas fa-images text-blue-600"></i> 影像资料
                </h3>

                 <!-- Row 1 -->
                 <div class="flex gap-8 mb-10">
                    <!-- Appearance (2 images) -->
                    <div class="flex-2 flex flex-col">
                      <SectionTitle icon="camera" title="外观检查" />
                      <div class="flex gap-4">
                        <DisplayBox v-model="files.appearanceFront" label="正面" />
                        <DisplayBox v-model="files.appearanceSide" label="侧面" />
                      </div>
                    </div>

                    <!-- Neck (2 images) -->
                    <div class="flex-2 flex flex-col">
                      <SectionTitle icon="ruler-vertical" title="颈围、甲颏距离和胸颏距离" />
                      <div class="flex gap-4">
                         <DisplayBox v-model="files.neckSideUp" label="侧面仰头" />
                         <DisplayBox v-model="files.neckFrontUp" label="正面仰头" />
                      </div>
                    </div>

                    <!-- Flexion Video (1 video) -->
                    <div class="flex-1 flex flex-col">
                      <SectionTitle icon="video" title="前屈" />
                      <div class="flex gap-4 h-full">
                        <DisplayBox v-model="files.videoFlexion" type="video" label="视频" />
                      </div>
                    </div>
                 </div>

                 <!-- Row 2 -->
                 <div class="flex gap-6">
                    <!-- Mouth -->
                    <div class="flex-1 flex flex-col">
                      <SectionTitle icon="tooth" title="张口度" small />
                      <DisplayBox v-model="files.mouthOpening" />
                    </div>

                    <!-- Mallampati -->
                    <div class="flex-1 flex flex-col">
                      <SectionTitle icon="list-ol" title="Mallampati分级" small />
                       <DisplayBox v-model="files.mallampati" />
                    </div>

                    <!-- Teeth -->
                    <div class="flex-1 flex flex-col">
                      <SectionTitle icon="teeth" title="牙齿检查" small />
                       <DisplayBox v-model="files.teeth" />
                    </div>

                    <!-- Upper Lip -->
                    <div class="flex-1 flex flex-col">
                      <SectionTitle icon="smile" title="上唇咬合试验" small />
                       <DisplayBox v-model="files.upperLip" />
                    </div>

                    <!-- General Video -->
                    <div class="flex-1 flex flex-col">
                       <SectionTitle icon="video" title="后仰" small />
                       <DisplayBox v-model="files.videoGeneral" type="video" />
                    </div>
                 </div>
            </div>
       </div>
    </main>
  </div>
</template>

<script setup>
import { ref, defineComponent, h, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getEvaluationList, getPatientById, getPatientMediaInfo, getPhotoFileByPath } from '@/api/airway.js';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';

const router = useRouter();

// State
const dateRange = ref(null);
const searchKeyword = ref('');
const difficultAirwayFilter = ref(null);
const list = ref([]);
const currentItem = ref(null);
const loading = ref(false);

// Detail State
const patientInfo = ref({});
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

// Components
const InfoItem = defineComponent({
    props: ['label', 'value', 'unit', 'class'],
    render() {
        return h('div', { class: ['flex flex-col', this.class] }, [
            h('span', { class: 'text-gray-400 text-xs mb-1' }, this.label),
            h('span', { class: 'text-gray-800 font-medium text-base' }, 
                this.value !== null && this.value !== undefined && this.value !== '' 
                ? `${this.value}${this.unit || ''}` 
                : '-'
            )
        ])
    }
});

const SectionTitle = defineComponent({
    props: ['icon', 'title', 'small'],
    render() {
        return h('div', { 
            class: `flex items-center justify-center gap-2 bg-blue-600 rounded-full mb-4 px-2 shadow-sm ${this.small ? 'h-8 text-sm' : 'h-10'}`
        }, [
            h('i', { class: `fas fa-${this.icon} text-white` }),
            h('span', { class: 'text-white font-medium' }, this.title)
        ])
    }
});

const DisplayBox = defineComponent({
  props: ['modelValue', 'label', 'type'],
  setup(props) {
    return () => h('div', {
      class: 'flex-1 bg-gray-50 rounded-lg overflow-hidden relative aspect-[3/4] flex items-center justify-center border border-gray-200 group hover:shadow-md transition-all',
    }, [
      props.modelValue 
        ? (props.type === 'video' 
            ? h('video', { src: props.modelValue, class: 'w-full h-full object-cover', controls: true }) 
            : h('img', { src: props.modelValue, class: 'w-full h-full object-cover cursor-zoom-in', onClick: () => window.open(props.modelValue, '_blank') }))
        : h('div', { class: 'flex flex-col items-center text-gray-300' }, [
            h('i', { class: `fas fa-${props.type === 'video' ? 'video' : 'image'} text-3xl mb-2` }),
            h('span', { class: 'text-xs' }, props.label || '暂无')
          ])
    ])
  }
});

// Mock Data
const generateMockData = () => {
    const data = [];
    for(let i=0; i<10; i++) {
        data.push({
            id: i,
            name: ['张三', '李四', '王五', '赵六', '钱七'][i % 5] + (i+1),
            caseNumber: `202312${String(i+1).padStart(2, '0')}`,
            admissionNumber: `202312${String(i+1).padStart(2, '0')}`,
            difficultAirway: Math.random() > 0.7,
            createTime: dayjs().subtract(i, 'day').format('YYYY-MM-DD HH:mm:ss'),
            gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
            age: 20 + i * 2,
            height: 170 + i,
            weight: 60 + i,
            pastMedicalHistory: '无',
            state: 'EVALUATED'
        });
    }
    return data;
};

// Actions
const fetchList = () => {
    loading.value = true;
    
    const payload = {
        startTime: dateRange.value ? dateRange.value[0] : null,
        endTime: dateRange.value ? dateRange.value[1] : null,
        keyword: searchKeyword.value || null,
        difficultAirway: difficultAirwayFilter.value
    };

    getEvaluationList(payload).then(res => {
        if (res && res.code === 200 && res.data) {
            list.value = res.data;
        } else {
            ElMessage.warning(res?.message || '获取列表失败');
            list.value = []; // Clear list on failure or keep empty
        }
    }).catch(err => {
        console.error('Fetch list failed', err);
        ElMessage.error('获取列表异常');
    }).finally(() => {
        loading.value = false;
    });
};

const handleFilter = () => {
    fetchList();
};

const toggleDifficultyFilter = (val) => {
    if (difficultAirwayFilter.value === val) {
        difficultAirwayFilter.value = null; // Toggle off
    } else {
        difficultAirwayFilter.value = val;
    }
    fetchList();
};

const filteredList = computed(() => {
    // List is already filtered by backend
    return list.value;
});

const selectItem = (item) => {
    currentItem.value = item;
    patientInfo.value = { ...item }; // Basic info from list
    
    // Clear previous files
    Object.keys(files.value).forEach(k => {
        if (files.value[k]) URL.revokeObjectURL(files.value[k]);
        files.value[k] = null;
    });

    // If we have a real ID, fetch details
    // Use airwayPatientId (often same as id in list response, or needs mapping)
    if (item.id) {
         // Assuming item.id IS the airwayPatientId from the list response
         getPatientMediaInfo(item.id).then(mediaRes => {
             if (mediaRes && mediaRes.code === 200 && mediaRes.data) {
                 const info = mediaRes.data;
                 
                 const loadPreview = (key, path) => {
                     if (!path) {
                        files.value[key] = null;
                        return;
                     }
                     getPhotoFileByPath(path).then(blob => {
                         if (blob && blob.size > 0) {
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
         });
    }
};

// Utils
const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-';
};

const formatGender = (val) => {
    const map = { 'MALE': '男', 'FEMALE': '女' };
    return map[val] || val || '-';
};

onMounted(() => {
    fetchList();
});
</script>

<style scoped>
.flex-2 {
  flex: 2;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}
</style>