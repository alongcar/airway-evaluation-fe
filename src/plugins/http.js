import axios from 'axios';
// import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getRefresToken, setAuthToken, getAuthToken, removeAuthToken } from "@/utils/storage.js"

// const router = useRouter()

const httpStatus = (status) => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8;'
    },
  },
  transformRequest: [
    (data, headers) => {
      if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data'; // 针对文件上传的情况
        return data;
      }
      return JSON.stringify(data);
    },
  ]
});

// // request interceptor
// 创建一个标记，用于标识是否是登录请求
// let isLoginRequest = false;

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 标记登录请求
    if (config.url && config.url.includes('/api/oauth/token/login')) {
      // isLoginRequest = true;
      config.isLoginRequest = true;
    }
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    error.data = {};
    error.data.msg = '请求异常，请联系管理员！';
    console.error('request interceptor error :', error);
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 只要 HTTP 状态码是 2xx，就直接返回业务数据
    return res;
  },
  async (error) => {
    // 合并错误处理逻辑
    if (error.response) {
      const { status } = error.response;
      const { config } = error;
      
      // 如果是登录请求的401错误，直接返回错误，不显示通用错误消息
      if (status == 401 && config.isLoginRequest) {
        return Promise.reject(error);
      }
      
      // 处理其他401错误，尝试刷新token
      if (status == 401 && await refreshToken()) {
        return service.request(error.config);
      }
      
      // 其他错误处理
      let msg = httpStatus(status);
      error.data = { err: msg };
      ElMessage.error(msg);
    } else if (error.data && error.data.err) {
      ElMessage.error(error.data.err);
    } else {
      error.data = {};
      error.data.err = '请求异常，请联系管理员！';
      ElMessage.error('请求异常，请联系管理员！');
    }
    
    return Promise.reject(error);
  }
);

/**
 * 令牌刷新
 */
async function refreshToken() {
  return axios.post(import.meta.env.VITE_BASE_URL + "/oauth/token/refresh", {}, {
    headers: {
      "refresh-token": getRefresToken()
    }
  }).then(res => {
    const data = res.data
    setAuthToken({
      access_token: data.access_token,
      refresh_token: data.refresh_token
    })
    return true;
  }).catch(() => {
    removeAuthToken()
    window.location.href = "/login"
    return false;
  })
}

export default service;
