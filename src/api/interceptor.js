import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://192.168.192.227:4000/admin/",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("token");
    // console.log("config", config);
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
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return Promise.reject(error);
  }
);

export default api;
