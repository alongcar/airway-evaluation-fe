import service from '@/plugins/http';

/**
 * 第一步: 获取病人基本信息及手术列表
 * 对应接口: patient/baseinfo
 * 说明: 获取结果是列表，对应该病人的多台手术，一般只会有一台
 * @param {object} params 查询参数，通常为病案号 { caseNumber: '...' }
 */
export const getPatientSurgeryList = (params) => {
  return service({
    url: '/airway/patient/baseinfo',
    method: 'get',
    params
  });
};

/**
 * 第二步: 保存患者基本信息
 * 对应接口: airway/patient/save
 * 说明: 前端医生确认后调用
 * @param {object} data 患者基本信息对象
 */
export const savePatientInfo = (data) => {
  return service.post(
    '/airway/airway/patient/save',
    data
  );
};

/**
 * 获取气道评估病人信息
 * @param {string} patientId 
 */
export const getPatientById = (patientId) => {
  return service({
    url: '/airway/airway/patient/getByPatientId',
    method: 'get',
    params: { patientId }
  });
};

/**
 * 第三步: 上传患者图像/视频信息
 * 对应接口: airway/patientMediaInfo/pushMediaInfo
 * 说明: 每上传一个患者图像/视频信息就调用此接口
 * @param {FormData} formData 包含文件流及相关信息的 FormData 对象
 */
export const pushMediaInfo = (formData) => {
  return service({
    url: '/airway/airway/patientMediaInfo/pushMediaInfo',
    method: 'post',
    data: formData,
    // axios 自动处理 FormData 的 Content-Type，通常不需要手动设置，
    // 但如果 http.js 封装有特殊处理，可能需要注意。
    // 这里保持默认，让 axios 自动识别 multipart/form-data
  });
};

/**
 * 获取患者图像/视频信息
 * @param {string} airwayPatientId 
 */
export const getPatientMediaInfo = (airwayPatientId) => {
  return service({
    url: '/airway/airway/patientMediaInfo/getByAirwayPatientId',
    method: 'get',
    params: { airwayPatientId }
  });
};

/**
 * 获取患者图像/视频信息
 * @param {string}  
 */
export const getPhotoFileByPath = (filePath) => {
  return service({
    url: '/file/files/preview',
    method: 'get',
    params: { filePath },
    responseType: 'blob'
  });
};

/**
 * 第四步: 开始气道评估
 * 对应接口: airway/patient/predict/start
 * 说明: 所有的图像/视频信息上传完成后调用
 * @param {object} airwayPatientId 病人的气道评估id
 */
export const startPatientPredict = (airwayPatientId) => {
  return service({
    url: '/airway/airway/patient/predict/start',
    method: 'get',
    params: { airwayPatientId },
    timeout: 600000 // Set timeout to 10 minutes for AI prediction
  });
};
