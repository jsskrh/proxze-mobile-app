import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://proxzi-backend-app.onrender.com",
});
