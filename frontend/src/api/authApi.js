// src/api/authApi.js
import axiosClient from './axiosClient';

const authApi = {
  register: (data) => axiosClient.post('/auth/register', data),
  login: (data) => axiosClient.post('/auth/login', data),
    // Thêm mới: gọi API đổi mật khẩu
  changePassword: (data) => axiosClient.post('/auth/change-password', data),
  
};

export default authApi;
