import useUserStore from '@/store/user';
import axios, { AxiosInstance } from 'axios';
import type {
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import { ElMessage } from 'element-plus';
const baseURL = '/api';

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        config.headers['Authorization'] =
            'Bearer ' + useUserStore().access_token;
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        if (response.status.toString()[0] !== '2') {
            ElMessage({
                type: 'error',
                message: '网络请求错误',
            });
        } else {
            if (response.data.code !== 200) {
                ElMessage({
                    type: 'error',
                    message: response.data.msg,
                });
            }
        }
        return response;
    },
    (error: AxiosError) => {
        // 处理响应错误
        const message = (error.response?.data as any)?.msg;
        if (message) {
            ElMessage({
                type: 'error',
                message,
            });
        }
        return error.response;
    },
);
export default axiosInstance;
