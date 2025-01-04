import axios from "axios";

const backendUrl = "http://localhost:3000/api/v1";

const fetcher = axios.create({
  baseURL: backendUrl,
});

fetcher.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token"))
      config.headers.token = localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default fetcher;
