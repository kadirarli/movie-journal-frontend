import API from './api';
import { jwtDecode } from 'jwt-decode'; // Token decode etmek için jwt-decode kütüphanesi

// Kullanıcı giriş yapar
export const login = async (credentials) => {
    const { data } = await API.post('/users/login', credentials);
    console.log();
    localStorage.setItem('token', data.token);
    return data;
};

// Kullanıcı kaydolur
export const register = async (userInfo) => {
    const { data } = await API.post('/users/register', userInfo);
    return data;
};

// Kullanıcı profili alır
export const getProfile = async () => {
    const { data } = await API.get('/users/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return data;
};

// Kullanıcı oturum kapatır
export const logout = async () => {
    try {
        // Backend'de oturumu sonlandırmak için istekte bulunabilirsiniz (isteğe bağlı)
        await API.post('/users/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    } catch (error) {
        console.error('Error during logout:', error.message);
    } finally {
        // Token'ı temizle
        localStorage.removeItem('token');
    }
};

// Token geçerliliğini kontrol eder
export const checkTokenValidity = (token) => {
    if (!token) return false; // Token yoksa geçersiz
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Mevcut zaman (saniye cinsinden)
        return decoded.exp > currentTime; // Token süresi dolmamışsa geçerli
    } catch (error) {
        console.error('Invalid token:', error);
        return false; // Decode edilemezse geçersiz
    }
};
