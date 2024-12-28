import axios from 'axios';
import { checkTokenValidity } from './authService'; // checkTokenValidity fonksiyonunu import edin

const API = axios.create({
    baseURL: 'http://localhost:4000/api', // Backend URL'i
});

// Request interceptor
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token');
        
        // Token varsa ve geçerliyse Authorization header'ına ekle
        if (token) {
            // Token geçerli mi kontrol et
            if (checkTokenValidity(token)) {
                req.headers.Authorization = `Bearer ${token}`;
            } else {
                // Token geçersizse temizle
                localStorage.removeItem('token');
            }
        }
        
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        // 401 (Unauthorized) hatası gelirse
        if (error.response && error.response.status === 401) {
            // Token'ı temizle
            localStorage.removeItem('token');
            
            // Ana sayfaya yönlendir
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default API;