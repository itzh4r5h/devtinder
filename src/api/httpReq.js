import axios from "axios";

export const httpReq = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  withCredentials: true,
})
