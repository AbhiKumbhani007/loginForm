import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.192.227:4000/admin/",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("token");
    console.log("config", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
