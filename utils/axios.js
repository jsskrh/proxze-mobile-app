import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://proxze-backend-app.onrender.com",
});
