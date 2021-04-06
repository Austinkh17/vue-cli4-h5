import axios from 'axios';

const instance = axios.create({
    baseURL: '',
    timeout: 30000
});

instance.interceptors.request.use(config => {
    let token = localStorage.getItem('jwtToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err);
});

export default instance