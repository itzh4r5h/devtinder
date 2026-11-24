import axios from "axios";

export const httpReq = axios.create({
  baseURL: location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/' : '/api/v1/',
  withCredentials: true,
})
