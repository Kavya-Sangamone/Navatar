import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor for debugging
API.interceptors.request.use(
    config => {
        console.log('Making request to:', config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
API.interceptors.response.use(
    response => {
        console.log('Response received:', response.data);
        return response;
    },
    error => {
        console.error('Response error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default API;
