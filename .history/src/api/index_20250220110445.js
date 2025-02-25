// src/api/axiosInstance.js
import axios from 'axios';

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 替换为你的 API 基础 URL
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.error('请求出错:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 处理响应错误
    console.error('响应出错:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;