import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.192.227:4000/admin/",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
};

api.interceptors.request.use(
  function (config) {
    // console.log("Config in interceptor:", config);
    // Do something before request is sent
    // config.headers = apiConfig.headers;
    // console.log("config", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // console.log("Response in interceptor:", response);
    // const token = response?.data["data"]?.token;
    // localStorage.setItem("token", token);
    // console.log(token);

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
