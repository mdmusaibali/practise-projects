import axios from "axios";
// config
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "/api",
});

export default axiosInstance;
