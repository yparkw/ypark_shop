/* eslint-disable no-unused-vars */
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", //개발용 https, 보안을 위해 https로 변경해야함
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.defaults.timeout = 5000;

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
