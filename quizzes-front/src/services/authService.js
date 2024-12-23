import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const api = axios.create({
    baseURL: `https://localhost:7260`,
});



export const login = async (userName, password) => {
    try {
        const response = await api.post('/api/login', { userName, password });
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('username', response.data.userName);
        

        const token = response.data.accessToken;
        if (token) {
            const decodedToken = jwtDecode(token);
            localStorage.setItem('userid', decodedToken.sub);
            localStorage.setItem('userRole', decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        }

        

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
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
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
