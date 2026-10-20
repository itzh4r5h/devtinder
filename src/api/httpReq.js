import axios from "axios";

export const httpReq = axios.create({
  baseURL: 'http://10.34.121.80:3000/api/v1/',
  withCredentials: true,
})
