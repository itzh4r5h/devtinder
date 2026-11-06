import axios from "axios";

export const httpReq = axios.create({
  baseURL: location.hostname === '10.34.121.80' ? 'http://10.34.121.80:3000/api/v1/' : '/api/v1/',
  withCredentials: true,
})
