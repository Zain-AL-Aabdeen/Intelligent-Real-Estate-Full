import axios from 'axios';

// تحديد رابط سيرفر الديجانغو (لوكال)
const API_BASE_URL = 'http://127.0.0.1:8000'; 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// إضافة توكن الحماية تلقائياً لأي طلب يحتاجه (مثل التوقعات والأرشيف)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// دالة تسجيل الدخول (Login) - تم إضافة سطر حفظ الإيميل ديناميكياً لتحديث الـ Navbar 🎯
export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login/', { email, password });
    
    if (response.data && response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_email', email); // 👈 السطر السحري لقراءة الإيميل بالنافبار
    }
    return response.data;
};

// دالة تسجيل حساب جديد (Register)
export const registerUser = async (username, email, password, confirmPassword) => {
    const response = await api.post('/auth/register/', {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword
    });
    return response.data;
};

// دالة طلب توقع السعر (Get Price)
export const getPropertyPrice = async (formData) => {
    const response = await api.post('/predection/Get_Price/', formData);
    return response.data;
};

// دالة جلب أرشيف المستخدم (History)
export const getUserHistory = async () => {
    const response = await api.get('/predection/User_History/');
    return response.data;
};

export default api;