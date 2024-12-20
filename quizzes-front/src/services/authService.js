import axios from 'axios';

const api = axios.create({
    baseURL: `https://localhost:7260`,
});



export const login = async (userName, password) => {
    try {
        const response = await api.post('/api/login', { userName, password });
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('username', response.data.userName);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await api.post('/api/accounts', { username, email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        await api.post('/api/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    } catch (error) {
        throw error;
    }
};

export const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/auth/accessToken', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
