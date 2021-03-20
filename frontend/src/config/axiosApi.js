import axios from "axios";
import { baseApi } from "./constants"

const axiosApi = axios.create({
  baseURL: baseApi
});

export default axiosApi;