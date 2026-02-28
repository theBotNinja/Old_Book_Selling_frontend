import axios from "axios";

const api = axios.create({
    baseURL: "https://old-book-selling-backend.vercel.app/", // backend base URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
